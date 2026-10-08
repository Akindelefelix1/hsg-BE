import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Public } from '../../common/auth.js';
import { AuthService } from './auth.service.js';
import { LoginDto, RefreshDto, RegisterDto } from './auth.dto.js';
@ApiTags('auth') @Controller('auth')
export class AuthController { constructor(private readonly auth:AuthService){} @Public() @Post('register') register(@Body() dto:RegisterDto){return this.auth.register(dto)} @Public() @HttpCode(200) @Post('login') login(@Body() dto:LoginDto){return this.auth.login(dto)} @Public() @HttpCode(200) @Post('refresh') refresh(@Body() dto:RefreshDto){return this.auth.refresh(dto.refreshToken)} @ApiBearerAuth() @UseGuards(JwtAuthGuard) @HttpCode(204) @Post('logout') logout(@Req() req:{user:{id:string}}){return this.auth.logout(req.user.id)} }
