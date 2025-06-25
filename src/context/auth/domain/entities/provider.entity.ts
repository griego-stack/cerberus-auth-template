export interface IUserProvider {
  id: number;
  name: string;
}

export type CreateUserProviderDTO = Omit<IUserProvider, 'id'>;

export class UserProviderEntity implements IUserProvider {
  id: number;
  name: string;

  constructor(attrs: IUserProvider) {
    this.id = attrs.id;
    this.name = attrs.name;
  }

  static create(attrs: CreateUserProviderDTO) {
    return new UserProviderEntity({
      ...attrs,
      id: 0,
    });
  }
}
