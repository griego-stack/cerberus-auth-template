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
      relations: ['user'],
    });

    return userRefreshToken
      ? this._createUserRefreshTokenEntityInstance(userRefreshToken)
      : null;
  }

  async revokeToken(token: string): Promise<void> {
    const userRefreshToken = await UserRefreshToken.findOne({
      where: { token },
    });

    if (!userRefreshToken) return;

    userRefreshToken.revoked = true;
    await userRefreshToken.save();
  }

  async invalidateOldTokens(userId: number): Promise<void> {
    await UserRefreshToken.update(
      { user: { id: userId }, revoked: false },
      { revoked: true },
    );
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
