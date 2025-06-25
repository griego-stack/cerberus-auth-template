import { Injectable } from 'src/bootstrap';
import {
  UserRefreshTokenEntity,
  UserRefreshTokenRepository,
} from 'src/context/auth/domain';
import { UserRefreshToken } from '../entities/refresh-token.entity';
import { User } from '../entities';

@Injectable()
export class InDatabaseUserRefreshTokenRepository
  implements UserRefreshTokenRepository
{
  async findOne(token: string): Promise<UserRefreshTokenEntity | null> {
    const userRefreshToken = await UserRefreshToken.findOne({
      where: { token },
    });

    return userRefreshToken
      ? this._createUserRefreshTokenEntityInstance(userRefreshToken)
      : null;
  }

  async create(data: UserRefreshTokenEntity): Promise<UserRefreshTokenEntity> {
    const refreshToken = UserRefreshToken.create({
      user: { id: data.userId } as User,
      token: data.token,
      expiresAt: data.expiresAt,
      deviceInfo: data.deviceInfo,
      ipAddress: data.ipAddress,
      revoked: data.revoked,
    });

    const savedRefreshToken = await refreshToken.save();
    return this._createUserRefreshTokenEntityInstance(savedRefreshToken);
  }

  _createUserRefreshTokenEntityInstance(
    data: UserRefreshToken,
  ): UserRefreshTokenEntity {
    return new UserRefreshTokenEntity({
      id: data.id,
      userId: data.user.id,
      token: data.token,
      expiresAt: data.expiresAt,
      createdAt: data.createdAt,
      deviceInfo: data.deviceInfo,
      ipAddress: data.ipAddress,
      revoked: data.revoked,
    });
  }
}
