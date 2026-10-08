import { Role } from '../../common/auth.js';
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
    role: Role;
    refreshTokenHash: string | null;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
