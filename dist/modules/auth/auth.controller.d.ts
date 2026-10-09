import { AuthService } from './auth.service.js';
import type { AuthenticatedUser } from './auth.service.js';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    me(req: {
        user: AuthenticatedUser;
    }): Promise<{
        role: import("../../common/roles.js").Role;
        id: string;
        email: string;
        name?: string;
    }>;
}
