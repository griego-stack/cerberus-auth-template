export interface IUserConfirmationToken {
  id: number;
  userId: number;
  token: string;
  expiration: Date;
  isUsed: boolean;
}

export type CreateUserConfirmationTokenDTO = Omit<
  IUserConfirmationToken,
  'id' | 'isUsed'
>;

export class UserConfirmationTokenEntity implements IUserConfirmationToken {
  id: number;
  userId: number;
  token: string;
  expiration: Date;
  isUsed: boolean;

  constructor(attrs: IUserConfirmationToken) {
    this.id = attrs.id;
    this.userId = attrs.userId;
    this.token = attrs.token;
    this.expiration = attrs.expiration;
    this.isUsed = attrs.isUsed;
  }

  static create(attrs: CreateUserConfirmationTokenDTO) {
    return new UserConfirmationTokenEntity({
      ...attrs,
      id: 0,
      isUsed: false,
    });
  }
}
