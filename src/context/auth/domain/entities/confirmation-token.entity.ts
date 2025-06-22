export interface IUserConfirmationToken {
  userId: number;
  token: string;
  expiration: Date;
  isUsed: boolean;
}

export type CreateUserConfirmationTokenDTO = Omit<
  IUserConfirmationToken,
  'isUsed'
>;

export class UserConfirmationTokenEntity implements IUserConfirmationToken {
  userId: number;
  token: string;
  expiration: Date;
  isUsed: boolean;

  constructor(attrs: IUserConfirmationToken) {
    this.userId = attrs.userId;
    this.token = attrs.token;
    this.expiration = attrs.expiration;
    this.isUsed = attrs.isUsed;
  }

  static create(attrs: CreateUserConfirmationTokenDTO) {
    return new UserConfirmationTokenEntity({
      ...attrs,
      isUsed: false,
    });
  }
}
