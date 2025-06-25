export interface IUserLoginAttemps {
  id: number;
  userId?: number;
  userIdentificator?: string;
  ipAddress: string;
  deviceInfo: string;
  success: boolean;
  createdAt: Date;
}

export type CreateUserLoginAttempsDTO = Omit<
  IUserLoginAttemps,
  'id' | 'createdAt'
>;

export class UserLoginAttempsEntity implements IUserLoginAttemps {
  id: number;
  userId?: number;
  userIdentificator?: string;
  ipAddress: string;
  deviceInfo: string;
  success: boolean;
  createdAt: Date;

  constructor(attrs: IUserLoginAttemps) {
    this.id = attrs.id;
    this.userId = attrs.userId;
    this.userIdentificator = attrs.userIdentificator;
    this.ipAddress = attrs.ipAddress;
    this.deviceInfo = attrs.deviceInfo;
    this.success = attrs.success;
    this.createdAt = attrs.createdAt;
  }

  static create(attrs: CreateUserLoginAttempsDTO) {
    const now = new Date();

    return new UserLoginAttempsEntity({
      ...attrs,
      id: 0,
      createdAt: now,
    });
  }
}
