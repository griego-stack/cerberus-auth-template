import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'refresh_token' })
export class UserRefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ type: 'char', length: 32, unique: true })
  token: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'text' })
  deviceInfo: string;

  @Column({ type: 'varchar', length: 45 })
  ipAddress: string;

  @Column({ type: 'boolean', default: false })
  revoked: boolean;
}
