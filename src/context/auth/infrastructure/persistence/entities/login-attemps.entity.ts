import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'login_attemp' })
export class UserLoginAttemps extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  user: User;

  @Column({ type: 'varchar', length: 254, nullable: true })
  userIdentificator: string;

  @Column({ type: 'varchar', length: 45 })
  ipAddress: string;

  @Column({ type: 'text' })
  deviceInfo: string;

  @Column({ type: 'boolean' })
  success: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
