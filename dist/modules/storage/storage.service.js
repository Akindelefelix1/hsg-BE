var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client, } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
let StorageService = class StorageService {
    client;
    bucket;
    constructor(config) {
        this.bucket = config.getOrThrow('STORAGE_BUCKET');
        this.client = new S3Client({
            region: config.getOrThrow('AWS_REGION'),
            endpoint: config.getOrThrow('AWS_ENDPOINT_URL_S3'),
            forcePathStyle: true,
            credentials: {
                accessKeyId: config.getOrThrow('AWS_ACCESS_KEY_ID'),
                secretAccessKey: config.getOrThrow('AWS_SECRET_ACCESS_KEY'),
            },
        });
    }
    async createUploadUrl(key, contentType) {
        const url = await getSignedUrl(this.client, new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            ContentType: contentType,
        }), { expiresIn: 300 });
        return { key, url, expiresIn: 300 };
    }
    async createReadUrl(key) {
        const url = await getSignedUrl(this.client, new GetObjectCommand({ Bucket: this.bucket, Key: key }), { expiresIn: 900 });
        return { key, url, expiresIn: 900 };
    }
    async remove(key) {
        await this.client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
    }
};
StorageService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], StorageService);
export { StorageService };
//# sourceMappingURL=storage.service.js.map