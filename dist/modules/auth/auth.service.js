var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
let AuthService = class AuthService {
    users;
    jwt;
    constructor(users, jwt) {
        this.users = users;
        this.jwt = jwt;
    }
    async register(dto) { if (await this.users.findByEmail(dto.email))
        throw new ConflictException('Email is already registered'); const user = await this.users.create({ name: dto.name, email: dto.email.toLowerCase(), passwordHash: await bcrypt.hash(dto.password, 12) }); return this.issue(user.id, user.email, user.role); }
    async login(dto) { const user = await this.users.findByEmail(dto.email, true); if (!user?.active || !await bcrypt.compare(dto.password, user.passwordHash))
        throw new UnauthorizedException('Invalid credentials'); return this.issue(user.id, user.email, user.role); }
    async refresh(token) { try {
        const payload = await this.jwt.verifyAsync(token, { secret: process.env.JWT_REFRESH_SECRET });
        const user = await this.users.findByEmail(payload.email, true);
        if (!user?.refreshTokenHash || !await bcrypt.compare(token, user.refreshTokenHash))
            throw new Error();
        return this.issue(user.id, user.email, user.role);
    }
    catch {
        throw new UnauthorizedException('Invalid refresh token');
    } }
    async logout(userId) { await this.users.setRefreshToken(userId, null); }
    async issue(sub, email, role) { const payload = { sub, email, role }; const accessToken = await this.jwt.signAsync(payload, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' }); const refreshToken = await this.jwt.signAsync(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' }); await this.users.setRefreshToken(sub, await bcrypt.hash(refreshToken, 12)); return { accessToken, refreshToken }; }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UsersService, JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map