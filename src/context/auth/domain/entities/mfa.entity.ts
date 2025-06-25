export interface IUserMFA {
  userId: number;
  secret: string;
  iv: string;
  isEnabled: boolean;
}

export type CreateUserMFADTO = Omit<IUserMFA, 'isEnabled'>;

export class UserMFAEntity implements IUserMFA {
  userId: number;
  secret: string;
  iv: string;
  isEnabled: boolean;

  constructor(attrs: IUserMFA) {
    this.userId = attrs.userId;
    this.secret = attrs.secret;
    this.iv = attrs.iv;
    this.isEnabled = attrs.isEnabled;
  }

  static create(attrs: CreateUserMFADTO) {
    return new UserMFAEntity({
      ...attrs,
      isEnabled: true,
    });
  }
}
