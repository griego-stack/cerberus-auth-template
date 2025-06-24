import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'confirmation_token' })
export class UserConfirmationToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ type: 'varchar', length: 32, unique: true })
  token: string;

  @Column({ type: 'timestamp' })
  expiration: Date;

  @Column({ type: 'boolean', default: false })
  isUsed: boolean;
}
