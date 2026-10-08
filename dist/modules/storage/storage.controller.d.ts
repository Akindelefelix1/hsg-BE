import { UploadRequestDto } from './storage.dto.js';
import { StorageService } from './storage.service.js';
export declare class StorageController {
    private storage;
    constructor(storage: StorageService);
    upload(dto: UploadRequestDto): Promise<{
        key: string;
        url: string;
        expiresIn: number;
    }>;
    read(key: string): Promise<{
        key: string;
        url: string;
        expiresIn: number;
    }>;
    remove(key: string): Promise<void>;
}
