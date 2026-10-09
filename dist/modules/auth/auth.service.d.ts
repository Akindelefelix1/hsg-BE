import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Role } from '../../common/roles.js';
export interface AuthenticatedUser {
    id: string;
    email: string;
    name?: string;
}
export declare class AuthService {
    private readonly dataSource;
    private readonly issuer;
    private readonly jwks;
    constructor(config: ConfigService, dataSource: DataSource);
    verifyAccessToken(token: string): Promise<AuthenticatedUser>;
    getRole(userId: string): Promise<Role | null>;
}
