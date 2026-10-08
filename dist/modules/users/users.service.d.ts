import { Repository } from 'typeorm';
import { User } from './user.entity.js';
export declare class UsersService {
    private readonly users;
    constructor(users: Repository<User>);
    findByEmail(email: string, secrets?: boolean): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(data: Pick<User, 'email' | 'name' | 'passwordHash'>): Promise<User>;
    setRefreshToken(id: string, refreshTokenHash: string | null): Promise<void>;
}
