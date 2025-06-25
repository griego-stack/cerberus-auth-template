import { UserLoginAttempsEntity } from '../entities/login-attemps.entity';

export abstract class UserLoginAttempsRepository {
  abstract countIpInLastWindow(
    ipAddress: string,
    windowStart: number,
  ): Promise<number>;

  abstract create(
    data: UserLoginAttempsEntity,
  ): Promise<UserLoginAttempsEntity>;
}
