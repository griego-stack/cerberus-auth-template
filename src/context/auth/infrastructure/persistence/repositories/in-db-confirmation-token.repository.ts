import { Injectable } from 'src/bootstrap';
import {
  UserConfirmationTokenEntity,
  UserConfirmationTokenRepository,
} from 'src/context/auth/domain';
import { UserConfirmationToken } from '../entities/confirmation-token.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class InDatabaseUserConfirmationTokenRepository
  implements UserConfirmationTokenRepository
{
  async findOne(token: string): Promise<UserConfirmationTokenEntity | null> {
    const confirmationToken = await UserConfirmationToken.findOne({
      where: { token },
      relations: ['user'],
    });

    return confirmationToken
      ? this._createUserConfirmationTokenEntityInstance(confirmationToken)
      : null;
  }

  async useToken(id: number): Promise<void> {
    const confirmationToken = await UserConfirmationToken.findOne({
      where: { id },
    });

    if (!confirmationToken) return;

    confirmationToken.isUsed = true;
    await confirmationToken.save();
  }

  async invalidateOldTokens(userId: number): Promise<void> {
    await UserConfirmationToken.update(
      { user: { id: userId }, isUsed: false },
      { isUsed: true },
    );
  }

  async create(
    data: UserConfirmationTokenEntity,
  ): Promise<UserConfirmationTokenEntity> {
    const confirmationToken = UserConfirmationToken.create({
      user: { id: data.userId } as User,
      token: data.token,
      expiresAt: data.expiresAt,
      isUsed: data.isUsed,
    });

    const savedConfirmationToken = await confirmationToken.save();
    return this._createUserConfirmationTokenEntityInstance(
      savedConfirmationToken,
    );
  }

  _createUserConfirmationTokenEntityInstance(
    data: UserConfirmationToken,
  ): UserConfirmationTokenEntity {
    return new UserConfirmationTokenEntity({
      id: data.id,
      userId: data.user.id,
      token: data.token,
      expiresAt: data.expiresAt,
      isUsed: data.isUsed,
    });
  }
}
