export class IUser {
  id: number;
  username: string;
  email: string;
  password?: string;
  providerId: number;
  roleId: number;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
}

export type CreateUserDTO = Omit<
  IUser,
  | 'id'
  | 'isActive'
  | 'isEmailVerified'
  | 'createdAt'
  | 'updatedAt'
  | 'lastLogin'
>;

export class UserEntity implements IUser {
  id: number;
  username: string;
  email: string;
  password?: string;
  providerId: number;
  roleId: number;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;

  constructor(attrs: IUser) {
    this.id = attrs.id;
    this.username = attrs.username;
    this.email = attrs.email;
    this.password = attrs.password;
    this.providerId = attrs.providerId;
    this.roleId = attrs.roleId;
    this.isActive = attrs.isActive;
    this.isEmailVerified = attrs.isEmailVerified;
    this.createdAt = attrs.createdAt;
    this.updatedAt = attrs.updatedAt;
    this.lastLogin = attrs.lastLogin;
  }

  static create(attrs: CreateUserDTO) {
    const now = new Date();

    return new UserEntity({
      ...attrs,
      id: 0,
      isActive: true,
      isEmailVerified: false,
      createdAt: now,
      updatedAt: now,
      lastLogin: null,
    });
  }
}
