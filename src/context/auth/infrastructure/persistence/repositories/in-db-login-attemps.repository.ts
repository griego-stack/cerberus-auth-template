import { Injectable } from 'src/bootstrap';
import {
  UserLoginAttempsEntity,
  UserLoginAttempsRepository,
} from 'src/context/auth/domain';
import { User, UserLoginAttemps } from '../entities';

@Injectable()
export class InDatabaseUserLoginAttemptsRepository
  implements UserLoginAttempsRepository
{
  async create(data: UserLoginAttempsEntity): Promise<UserLoginAttempsEntity> {
    const loginAttempt = UserLoginAttemps.create({
      user: data.userId ? ({ id: data.userId } as User) : undefined,
      userIdentificator: data.userIdentificator,
      ipAddress: data.ipAddress,
      deviceInfo: data.deviceInfo,
      success: data.success,
    });

    const savedLoginAttempt = await loginAttempt.save();
    return this._createUserLoginAttemptsEntityInstance(savedLoginAttempt);
  }

  _createUserLoginAttemptsEntityInstance(
    data: UserLoginAttemps,
  ): UserLoginAttempsEntity {
    return new UserLoginAttempsEntity({
      id: data.id,
      userId: data.user ? data.user.id : undefined,
      userIdentificator: data.userIdentificator,
      ipAddress: data.ipAddress,
      deviceInfo: data.deviceInfo,
      success: data.success,
      createdAt: data.createdAt,
    });
  }
}
