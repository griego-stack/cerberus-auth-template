import {
  CreateAuditLogsDTO,
  UserAuditLogs,
} from '../entities/audit-logs.entity';

export abstract class AuditLogsRepository {
  abstract findAll(): Promise<UserAuditLogs[]>;
  abstract create(data: CreateAuditLogsDTO): Promise<void>;
}
