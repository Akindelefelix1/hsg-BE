import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

export enum Role { ADMIN = 'admin', CUSTOMER = 'customer' }
export const Public = () => SetMetadata('public', true);
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) { super(); }
  canActivate(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>('public', [context.getHandler(), context.getClass()]) || super.canActivate(context);
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()]);
    if (!roles?.length) return true;
    return roles.includes(context.switchToHttp().getRequest<{ user: { role: Role } }>().user.role);
  }
}
