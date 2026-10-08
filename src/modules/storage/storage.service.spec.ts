import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { StorageService } from './storage.service.js';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        StorageService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: (name: string) =>
              ({
                STORAGE_BUCKET: 'hsg-storage',
                AWS_REGION: 'us-east-2',
                AWS_ENDPOINT_URL_S3:
                  'https://br-test.storage.c-1.us-east-2.aws.neon.tech',
                AWS_ACCESS_KEY_ID: 'test-access-key',
                AWS_SECRET_ACCESS_KEY: 'test-secret-key',
              })[name],
          },
        },
      ],
    }).compile();

    service = module.get(StorageService);
  });

  it('returns an encoded public URL for stored media', () => {
    expect(service.createReadUrl('products/blue wool.webp')).toEqual({
      key: 'products/blue wool.webp',
      url: 'https://br-test.storage.c-1.us-east-2.aws.neon.tech/hsg-storage/products/blue%20wool.webp',
    });
  });

  it('creates a short-lived upload URL bound to the content type', async () => {
    const upload = await service.createUploadUrl(
      'products/blue-wool.webp',
      'image/webp',
    );
    const url = new URL(upload.url);

    expect(upload).toMatchObject({
      key: 'products/blue-wool.webp',
      contentType: 'image/webp',
      expiresIn: 300,
    });
    expect(url.searchParams.get('X-Amz-Expires')).toBe('300');
    expect(url.searchParams.get('X-Amz-SignedHeaders')).toContain(
      'content-type',
    );
  });
});
