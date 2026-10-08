import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '../../common/auth.js';
import { UploadRequestDto } from './storage.dto.js';
import { StorageService } from './storage.service.js';
@ApiTags('storage') @ApiBearerAuth() @Roles(Role.ADMIN) @UseGuards(JwtAuthGuard,RolesGuard) @Controller('storage')
export class StorageController { constructor(private storage:StorageService){} @Post('upload-url') upload(@Body()dto:UploadRequestDto){return this.storage.createUploadUrl(dto.key,dto.contentType)} @Get('read-url/*key') read(@Param('key')key:string){return this.storage.createReadUrl(key)} @Delete('*key') remove(@Param('key')key:string){return this.storage.remove(key)} }
