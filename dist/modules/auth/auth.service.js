var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, ServiceUnavailableException, UnauthorizedException, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { createRemoteJWKSet, errors, jwtVerify } from 'jose';
import { Role } from '../../common/roles.js';
let AuthService = class AuthService {
    dataSource;
    issuer;
    jwks;
    constructor(config, dataSource) {
        this.dataSource = dataSource;
        const authBaseUrl = config.getOrThrow('NEON_AUTH_BASE_URL');
        const jwksUrl = config.getOrThrow('NEON_AUTH_JWKS_URL');
        const authUrl = new URL(authBaseUrl);
        if (authUrl.protocol !== 'https:') {
            throw new Error('NEON_AUTH_BASE_URL must use HTTPS');
        }
        this.issuer = authUrl.origin;
        const keySetUrl = new URL(jwksUrl);
        if (keySetUrl.protocol !== 'https:' || keySetUrl.origin !== this.issuer) {
            throw new Error('NEON_AUTH_JWKS_URL must use HTTPS and match the Auth URL origin');
        }
        this.jwks = createRemoteJWKSet(keySetUrl);
    }
    async verifyAccessToken(token) {
        let payload;
        try {
            ({ payload } = await jwtVerify(token, this.jwks, {
                algorithms: ['EdDSA'],
                issuer: this.issuer,
                audience: this.issuer,
            }));
        }
        catch (error) {
            if (error instanceof errors.JWKSTimeout) {
                throw new ServiceUnavailableException('Neon Auth signing keys are temporarily unavailable');
            }
            if (error instanceof errors.JOSEError) {
                throw new UnauthorizedException('Invalid or expired access token');
            }
            throw error;
        }
        if (typeof payload.sub !== 'string' || typeof payload.email !== 'string') {
            throw new UnauthorizedException('Invalid access token claims');
        }
        return {
            id: payload.sub,
            email: payload.email,
            ...(typeof payload.name === 'string' ? { name: payload.name } : {}),
        };
    }
    async getRole(userId) {
        const users = await this.dataSource.query('SELECT "role" FROM neon_auth."user" WHERE "id" = $1', [userId]);
        const storedRole = users[0]?.role;
        if (storedRole === null || storedRole === undefined)
            return null;
        const roles = Array.isArray(storedRole)
            ? storedRole
            : storedRole.split(',').map((role) => role.trim());
        return roles.includes(Role.ADMIN) ? Role.ADMIN : Role.CUSTOMER;
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService,
        DataSource])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map