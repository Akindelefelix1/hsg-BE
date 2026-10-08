import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare enum Role {
    ADMIN = "admin",
    CUSTOMER = "customer"
}
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private readonly reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
}
export declare class RolesGuard implements CanActivate {
    private readonly reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean;
}
export {};
