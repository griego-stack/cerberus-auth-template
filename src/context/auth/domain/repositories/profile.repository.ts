import { UserProfileEntity } from '../entities/profile.entity';

export abstract class UserProfileRepository {
  abstract findOne(userId: number): Promise<UserProfileEntity | null>;
  abstract create(data: UserProfileEntity): Promise<UserProfileEntity>;
}
