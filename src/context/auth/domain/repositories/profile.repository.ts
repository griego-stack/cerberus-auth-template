import {
  CreateUserProfileDTO,
  UserProfileEntity,
} from '../entities/profile.entity';

export abstract class UserProfileRepository {
  abstract findAll(): Promise<UserProfileEntity[]>;
  abstract create(data: CreateUserProfileDTO): Promise<UserProfileEntity>;
}
