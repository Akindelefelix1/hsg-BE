import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/auth.js';
import { AuthService } from './auth.service.js';
import type { AuthenticatedUser } from './auth.service.js';

@ApiTags('auth')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get('me')
  async me(@Req() req: { user: AuthenticatedUser }) {
    const role = await this.auth.getRole(req.user.id);
    if (!role) throw new UnauthorizedException('Auth user was not found');
    return { ...req.user, role };
  }
}
