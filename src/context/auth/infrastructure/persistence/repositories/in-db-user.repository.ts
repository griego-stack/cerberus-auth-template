import { Injectable } from 'src/bootstrap';
import { UserEntity, UserRepository } from 'src/context/auth/domain';
import { User } from '../entities/user.entity';
import { Provider, Role } from '../entities';

@Injectable()
export class InDatabaseUserRepository implements UserRepository {
  async findAll(): Promise<UserEntity[]> {
    const users = await User.find({ relations: ['provider', 'role'] });
    return users.map((user) => this._createUserEntityInstance(user));
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = await User.findOne({
      where: { id },
      relations: ['provider', 'role'],
    });
    return user ? this._createUserEntityInstance(user) : null;
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await User.findOne({
      where: { username },
      relations: ['provider', 'role'],
    });

    return user ? this._createUserEntityInstance(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await User.findOne({
      where: { email },
      relations: ['provider', 'role'],
    });
    return user ? this._createUserEntityInstance(user) : null;
  }

  async create(data: UserEntity): Promise<UserEntity> {
    const user = User.create({
      username: data.username,
      email: data.email,
      password: data.password,
      provider: { id: data.providerId } as Provider,
      role: { id: data.roleId } as Role,
      isActive: data.isActive,
      isEmailVerified: data.isEmailVerified,
    });

    const savedUser = await user.save();
    return this._createUserEntityInstance(savedUser);
  }

  async updateLastlogin(userId: number) {
    const user = await User.update({ id: userId }, { lastLogin: new Date() });
    return user.affected ? true : false;
  }

  async confirmEmail(userId: number): Promise<boolean> {
    const user = await User.update({ id: userId }, { isEmailVerified: true });
    return user.affected ? true : false;
  }

  async changePassword(userId: number, password: string): Promise<boolean> {
    const user = await User.update({ id: userId }, { password });
    return user.affected ? true : false;
  }

  _createUserEntityInstance(data: User): UserEntity {
    return new UserEntity({
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
      providerId: data.provider.id,
      roleId: data.role.id,
      isActive: data.isActive,
      isEmailVerified: data.isEmailVerified,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      lastLogin: data.lastLogin || null,
    });
  }
}
