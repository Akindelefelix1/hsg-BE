import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
import { LoginDto, RegisterDto } from './auth.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly users: UsersService, private readonly jwt: JwtService) {}
  async register(dto: RegisterDto) { if (await this.users.findByEmail(dto.email)) throw new ConflictException('Email is already registered'); const user = await this.users.create({ name: dto.name, email: dto.email.toLowerCase(), passwordHash: await bcrypt.hash(dto.password, 12) }); return this.issue(user.id, user.email, user.role); }
  async login(dto: LoginDto) { const user = await this.users.findByEmail(dto.email, true); if (!user?.active || !await bcrypt.compare(dto.password, user.passwordHash)) throw new UnauthorizedException('Invalid credentials'); return this.issue(user.id, user.email, user.role); }
  async refresh(token: string) { try { const payload = await this.jwt.verifyAsync<{ sub:string; email:string; role:string }>(token, { secret: process.env.JWT_REFRESH_SECRET }); const user = await this.users.findByEmail(payload.email, true); if (!user?.refreshTokenHash || !await bcrypt.compare(token, user.refreshTokenHash)) throw new Error(); return this.issue(user.id, user.email, user.role); } catch { throw new UnauthorizedException('Invalid refresh token'); } }
  async logout(userId: string) { await this.users.setRefreshToken(userId, null); }
  private async issue(sub: string, email: string, role: string) { const payload={sub,email,role}; const accessToken=await this.jwt.signAsync(payload,{secret:process.env.JWT_ACCESS_SECRET,expiresIn:'15m'}); const refreshToken=await this.jwt.signAsync(payload,{secret:process.env.JWT_REFRESH_SECRET,expiresIn:'7d'}); await this.users.setRefreshToken(sub,await bcrypt.hash(refreshToken,12)); return {accessToken,refreshToken}; }
}
