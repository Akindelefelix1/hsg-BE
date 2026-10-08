import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly users: Repository<User>) {}
  findByEmail(email: string, secrets = false) { return this.users.createQueryBuilder('user').where('LOWER(user.email) = LOWER(:email)', { email }).addSelect(secrets ? ['user.passwordHash', 'user.refreshTokenHash'] : []).getOne(); }
  findById(id: string) { return this.users.findOneBy({ id, active: true }); }
  create(data: Pick<User, 'email'|'name'|'passwordHash'>) { return this.users.save(this.users.create(data)); }
  async setRefreshToken(id: string, refreshTokenHash: string | null) { await this.users.update(id, { refreshTokenHash }); }
}
