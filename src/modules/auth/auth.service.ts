import {
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { createRemoteJWKSet, errors, jwtVerify, type JWTPayload } from 'jose';
import { Role } from '../../common/roles.js';

export interface AuthenticatedUser {
  id: string;
  email: string;
  name?: string;
}

@Injectable()
export class AuthService {
  private readonly issuer: string;
  private readonly jwks: ReturnType<typeof createRemoteJWKSet>;

  constructor(
    config: ConfigService,
    private readonly dataSource: DataSource,
  ) {
    const authBaseUrl = config.getOrThrow<string>('NEON_AUTH_BASE_URL');
    const jwksUrl = config.getOrThrow<string>('NEON_AUTH_JWKS_URL');
    const authUrl = new URL(authBaseUrl);
    if (authUrl.protocol !== 'https:') {
      throw new Error('NEON_AUTH_BASE_URL must use HTTPS');
    }

    this.issuer = authUrl.origin;
    const keySetUrl = new URL(jwksUrl);
    if (keySetUrl.protocol !== 'https:' || keySetUrl.origin !== this.issuer) {
      throw new Error(
        'NEON_AUTH_JWKS_URL must use HTTPS and match the Auth URL origin',
      );
    }
    this.jwks = createRemoteJWKSet(keySetUrl);
  }

  async verifyAccessToken(token: string): Promise<AuthenticatedUser> {
    let payload: JWTPayload;
    try {
      ({ payload } = await jwtVerify(token, this.jwks, {
        algorithms: ['EdDSA'],
        issuer: this.issuer,
        audience: this.issuer,
      }));
    } catch (error) {
      if (error instanceof errors.JWKSTimeout) {
        throw new ServiceUnavailableException(
          'Neon Auth signing keys are temporarily unavailable',
        );
      }
      if (error instanceof errors.JOSEError) {
        throw new UnauthorizedException('Invalid or expired access token');
      }
      throw error;
    }

    if (typeof payload.sub !== 'string' || typeof payload.email !== 'string') {
      throw new UnauthorizedException('Invalid access token claims');
    }

    return {
      id: payload.sub,
      email: payload.email,
      ...(typeof payload.name === 'string' ? { name: payload.name } : {}),
    };
  }

  async getRole(userId: string): Promise<Role | null> {
    const users = await this.dataSource.query<
      Array<{ role: string | string[] | null }>
    >('SELECT "role" FROM neon_auth."user" WHERE "id" = $1', [userId]);
    const storedRole = users[0]?.role;
    if (storedRole === null || storedRole === undefined) return null;

    const roles = Array.isArray(storedRole)
      ? storedRole
      : storedRole.split(',').map((role) => role.trim());
    return roles.includes(Role.ADMIN) ? Role.ADMIN : Role.CUSTOMER;
  }
}
