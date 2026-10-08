import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class StorageService {
  private readonly client: S3Client;
  private readonly bucket: string;
  constructor(config: ConfigService) {
    this.bucket = config.getOrThrow('STORAGE_BUCKET');
    this.client = new S3Client({ region: config.getOrThrow('AWS_REGION'), endpoint: config.getOrThrow('AWS_ENDPOINT_URL_S3'), forcePathStyle: true, credentials: { accessKeyId: config.getOrThrow('AWS_ACCESS_KEY_ID'), secretAccessKey: config.getOrThrow('AWS_SECRET_ACCESS_KEY') } });
  }
  async createUploadUrl(key:string,contentType:string){const url=await getSignedUrl(this.client,new PutObjectCommand({Bucket:this.bucket,Key:key,ContentType:contentType}),{expiresIn:300});return {key,url,expiresIn:300}}
  async createReadUrl(key:string){const url=await getSignedUrl(this.client,new GetObjectCommand({Bucket:this.bucket,Key:key}),{expiresIn:900});return {key,url,expiresIn:900}}
  async remove(key:string){await this.client.send(new DeleteObjectCommand({Bucket:this.bucket,Key:key}))}
}
