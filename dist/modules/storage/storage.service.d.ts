import { ConfigService } from '@nestjs/config';
export declare class StorageService {
    private readonly client;
    private readonly bucket;
    constructor(config: ConfigService);
    createUploadUrl(key: string, contentType: string): Promise<{
        key: string;
        url: string;
        expiresIn: number;
    }>;
    createReadUrl(key: string): Promise<{
        key: string;
        url: string;
        expiresIn: number;
    }>;
    remove(key: string): Promise<void>;
}
