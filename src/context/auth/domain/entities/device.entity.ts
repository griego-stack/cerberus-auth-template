export interface IUserDevice {
  id: number;
  userId: number;
  deviceInfo: string;
  ipAddress: string;
  trusted: boolean;
  lastUsedAt: Date;
  createdAt: Date;
}

export type CreateUserDeviceDTO = Omit<
  IUserDevice,
  'id' | 'lastUsedAt' | 'createdAt'
>;

export class UserDeviceEntity implements IUserDevice {
  id: number;
  userId: number;
  deviceInfo: string;
  ipAddress: string;
  trusted: boolean;
  lastUsedAt: Date;
  createdAt: Date;

  constructor(attrs: IUserDevice) {
    this.id = attrs.id;
    this.userId = attrs.userId;
    this.deviceInfo = attrs.deviceInfo;
    this.ipAddress = attrs.ipAddress;
    this.trusted = attrs.trusted;
    this.lastUsedAt = attrs.lastUsedAt;
    this.createdAt = attrs.createdAt;
  }

  static create(attrs: CreateUserDeviceDTO) {
    const now = new Date();

    return new UserDeviceEntity({
      ...attrs,
      id: 0,
      lastUsedAt: now,
      createdAt: now,
    });
  }
}
