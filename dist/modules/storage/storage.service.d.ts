import { ConfigService } from '@nestjs/config';
export declare class StorageService {
    private readonly client;
    private readonly bucket;
    private readonly endpoint;
    constructor(config: ConfigService);
    private normalizeKey;
    createUploadUrl(key: string, contentType: string): Promise<{
        key: string;
        url: string;
        contentType: string;
        expiresIn: number;
    }>;
    createReadUrl(key: string | string[]): {
        key: string;
        url: string;
    };
    remove(key: string | string[]): Promise<void>;
}
