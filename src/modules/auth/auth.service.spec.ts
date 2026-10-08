import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { exportJWK, generateKeyPair, SignJWT } from 'jose';
import { AuthService } from './auth.service.js';

describe('AuthService', () => {
  const authBaseUrl = 'https://auth.example.test/project/auth';
  const jwksUrl = `${authBaseUrl}/.well-known/jwks.json`;
  const issuer = new URL(authBaseUrl).origin;
  let service: AuthService;
  let dataSource: { query: ReturnType<typeof vi.fn> };
  let privateKey: CryptoKey;
  let jwks: string;

  beforeAll(async () => {
    const keys = await generateKeyPair('EdDSA');
    privateKey = keys.privateKey;
    const publicKey = await exportJWK(keys.publicKey);
    jwks = JSON.stringify({
      keys: [{ ...publicKey, alg: 'EdDSA', kid: 'test-key' }],
    });
  });

  beforeEach(async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(jwks, { status: 200 })),
    );
    dataSource = {
      query: vi.fn().mockResolvedValue([{ role: 'user' }]),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: (key: string) =>
              key === 'NEON_AUTH_BASE_URL' ? authBaseUrl : jwksUrl,
          },
        },
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  async function createToken(
    overrides: {
      issuer?: string;
      expiration?: string;
    } = {},
  ) {
    return new SignJWT({
      email: 'customer@example.test',
      name: 'Test Customer',
    })
      .setProtectedHeader({ alg: 'EdDSA', kid: 'test-key' })
      .setIssuer(overrides.issuer ?? issuer)
      .setAudience(issuer)
      .setSubject('auth-user-id')
      .setExpirationTime(overrides.expiration ?? '5m')
      .sign(privateKey);
  }

  it('validates Neon-signed access tokens', async () => {
    const token = await createToken();

    await expect(service.verifyAccessToken(token)).resolves.toEqual({
      id: 'auth-user-id',
      email: 'customer@example.test',
      name: 'Test Customer',
    });
  });

  it('rejects tokens with a different issuer', async () => {
    const token = await createToken({ issuer: 'https://other.example.test' });

    await expect(service.verifyAccessToken(token)).rejects.toThrow(
      'Invalid or expired access token',
    );
  });

  it('maps Neon Auth administrator roles for API guards', async () => {
    dataSource.query.mockResolvedValue([{ role: 'admin' }]);

    await expect(service.getRole('auth-user-id')).resolves.toBe('admin');
    expect(dataSource.query).toHaveBeenCalledWith(
      'SELECT "role" FROM neon_auth."user" WHERE "id" = $1',
      ['auth-user-id'],
    );
  });
});
