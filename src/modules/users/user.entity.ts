import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../../common/auth.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ unique: true }) email!: string;
  @Column() passwordHash!: string;
  @Column() name!: string;
  @Column({ type: 'enum', enum: Role, default: Role.CUSTOMER }) role!: Role;
  @Column({ nullable: true, select: false }) refreshTokenHash!: string | null;
  @Column({ default: true }) active!: boolean;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
