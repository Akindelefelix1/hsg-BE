var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ForbiddenException, Injectable, SetMetadata, UnauthorizedException, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService, } from '../modules/auth/auth.service.js';
export { Role } from './roles.js';
export const Public = () => SetMetadata('public', true);
export const Roles = (...roles) => SetMetadata('roles', roles);
let JwtAuthGuard = class JwtAuthGuard {
    reflector;
    auth;
    constructor(reflector, auth) {
        this.reflector = reflector;
        this.auth = auth;
    }
    async canActivate(context) {
        if (this.reflector.getAllAndOverride('public', [
            context.getHandler(),
            context.getClass(),
        ])) {
            return true;
        }
        const request = context
            .switchToHttp()
            .getRequest();
        const authorization = request.headers.authorization;
        const match = typeof authorization === 'string'
            ? /^Bearer\s+(\S+)$/i.exec(authorization)
            : null;
        if (!match)
            throw new UnauthorizedException('Bearer token is required');
        request.user = await this.auth.verifyAccessToken(match[1]);
        return true;
    }
};
JwtAuthGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector,
        AuthService])
], JwtAuthGuard);
export { JwtAuthGuard };
let RolesGuard = class RolesGuard {
    reflector;
    auth;
    constructor(reflector, auth) {
        this.reflector = reflector;
        this.auth = auth;
    }
    async canActivate(context) {
        const roles = this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!roles?.length)
            return true;
        const request = context
            .switchToHttp()
            .getRequest();
        if (!request.user)
            throw new UnauthorizedException();
        const role = await this.auth.getRole(request.user.id);
        if (!role || !roles.includes(role))
            throw new ForbiddenException();
        return true;
    }
};
RolesGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector,
        AuthService])
], RolesGuard);
export { RolesGuard };
//# sourceMappingURL=auth.js.map