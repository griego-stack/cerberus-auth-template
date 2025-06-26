import {
  Entity,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'profile' })
export class UserProfile extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstname: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastname: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profileImage?: string;
}
