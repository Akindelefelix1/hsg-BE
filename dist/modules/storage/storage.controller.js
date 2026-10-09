var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '../../common/auth.js';
import { UploadRequestDto } from './storage.dto.js';
import { StorageService } from './storage.service.js';
let StorageController = class StorageController {
    storage;
    constructor(storage) {
        this.storage = storage;
    }
    upload(dto) { return this.storage.createUploadUrl(dto.key, dto.contentType); }
    read(key) { return this.storage.createReadUrl(key); }
    remove(key) { return this.storage.remove(key); }
};
__decorate([
    Post('upload-url'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UploadRequestDto]),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "upload", null);
__decorate([
    Get('read-url/*key'),
    __param(0, Param('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "read", null);
__decorate([
    Delete('*key'),
    __param(0, Param('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "remove", null);
StorageController = __decorate([
    ApiTags('storage'),
    ApiBearerAuth(),
    Roles(Role.ADMIN),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('storage'),
    __metadata("design:paramtypes", [StorageService])
], StorageController);
export { StorageController };
//# sourceMappingURL=storage.controller.js.map