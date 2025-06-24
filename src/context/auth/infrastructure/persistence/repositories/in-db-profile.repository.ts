import {
  UserProfileEntity,
  UserProfileRepository,
} from 'src/context/auth/domain';
import { UserProfile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';
import { Injectable } from 'src/bootstrap';

@Injectable()
export class InDatabaseUserProfileRepository implements UserProfileRepository {
  async findOne(userId: number): Promise<UserProfileEntity | null> {
    const userProfile = await UserProfile.findOne({
      where: { user: { id: userId } },
    });

    return userProfile
      ? this._createUserProfileEntityInstance(userProfile)
      : null;
  }

  async create(data: UserProfileEntity): Promise<UserProfileEntity> {
    const user = UserProfile.create({
      user: { id: data.user_id } as User,
      firstname: data.firstname,
      lastname: data.lastname,
      profileImage: data.profileImage,
    });

    const savedUserProfile = await user.save();
    return this._createUserProfileEntityInstance(savedUserProfile);
  }

  _createUserProfileEntityInstance(data: UserProfile): UserProfileEntity {
    return UserProfileEntity.create({
      user_id: data.user.id,
      firstname: data.firstname,
      lastname: data.lastname,
      profileImage: data.profileImage,
    });
  }
}
