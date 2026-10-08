var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
export class LoginDto {
    email;
    password;
}
__decorate([
    ApiProperty(),
    IsEmail(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MinLength(8),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
export class RegisterDto extends LoginDto {
    name;
}
__decorate([
    ApiProperty(),
    IsString(),
    MinLength(2),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
export class RefreshDto {
    refreshToken;
}
__decorate([
    ApiProperty(),
    IsString(),
    __metadata("design:type", String)
], RefreshDto.prototype, "refreshToken", void 0);
//# sourceMappingURL=auth.dto.js.map