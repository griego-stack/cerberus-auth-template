import { CreateUserRoleDTO, UserRoleEntity } from '../entities/role.entity';

export abstract class UserRoleRepository {
  abstract findAll(): Promise<UserRoleEntity[]>;
  abstract create(data: CreateUserRoleDTO): Promise<UserRoleEntity>;
}
