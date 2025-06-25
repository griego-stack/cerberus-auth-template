export interface IUserRole {
  id: number;
  name: string;
}

export type CreateUserRoleDTO = Omit<IUserRole, 'id'>;

export class UserRoleEntity implements IUserRole {
  id: number;
  name: string;

  constructor(attrs: IUserRole) {
    this.id = attrs.id;
    this.name = attrs.name;
  }

  static create(attrs: CreateUserRoleDTO) {
    return new UserRoleEntity({
      ...attrs,
      id: 0,
    });
  }
}
