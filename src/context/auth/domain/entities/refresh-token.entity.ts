export interface IUserRefreshToken {
  id: number;
  userId: number;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  deviceInfo: string;
  ipAddress: string;
  revoked: boolean;
}

export type CreateUserRefreshTokenDTO = Omit<
  IUserRefreshToken,
  'id' | 'createdAt' | 'revoked'
>;

export class UserRefreshTokenEntity implements IUserRefreshToken {
  id: number;
  userId: number;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  deviceInfo: string;
  ipAddress: string;
  revoked: boolean;

  constructor(attrs: IUserRefreshToken) {
    this.id = attrs.id;
    this.userId = attrs.userId;
    this.token = attrs.token;
    this.expiresAt = attrs.expiresAt;
    this.createdAt = attrs.createdAt;
    this.deviceInfo = attrs.deviceInfo;
    this.ipAddress = attrs.ipAddress;
    this.revoked = attrs.revoked;
  }

  static create(attrs: CreateUserRefreshTokenDTO) {
    const now = new Date();

    return new UserRefreshTokenEntity({
      ...attrs,
      id: 0,
      createdAt: now,
      revoked: false,
    });
  }

  isExpired(): boolean {
    return this.expiresAt < new Date();
  }
}
