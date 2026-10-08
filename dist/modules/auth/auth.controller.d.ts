import { AuthService } from './auth.service.js';
import { LoginDto, RefreshDto, RegisterDto } from './auth.dto.js';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(dto: RefreshDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(req: {
        user: {
            id: string;
        };
    }): Promise<void>;
}
