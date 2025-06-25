import {
  CreateUserDeviceDTO,
  UserDeviceEntity,
} from '../entities/device.entity';

export abstract class UserDeviceRepository {
  abstract findAll(): Promise<UserDeviceEntity[]>;
  abstract create(data: CreateUserDeviceDTO): Promise<UserDeviceEntity>;
}
