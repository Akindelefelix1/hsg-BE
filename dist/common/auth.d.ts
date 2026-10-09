import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../modules/auth/auth.service.js';
import { Role } from './roles.js';
export { Role } from './roles.js';
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
export declare class JwtAuthGuard implements CanActivate {
    private readonly reflector;
    private readonly auth;
    constructor(reflector: Reflector, auth: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class RolesGuard implements CanActivate {
    private readonly reflector;
    private readonly auth;
    constructor(reflector: Reflector, auth: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
