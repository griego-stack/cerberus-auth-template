export interface IUserAuditLogs {
  id: number;
  userId: number;
  action: string;
  metadata: string;
  createdAt: Date;
}

export type CreateAuditLogsDTO = Omit<IUserAuditLogs, 'id' | 'createdAt'>;

export class UserAuditLogs implements IUserAuditLogs {
  id: number;
  userId: number;
  action: string;
  metadata: string;
  createdAt: Date;

  constructor(attrs: IUserAuditLogs) {
    this.id = attrs.id;
    this.userId = attrs.userId;
    this.action = attrs.action;
    this.metadata = attrs.metadata;
    this.createdAt = attrs.createdAt;
  }

  static create(attrs: CreateAuditLogsDTO) {
    const now = new Date();

    return new UserAuditLogs({
      ...attrs,
      id: 0,
      createdAt: now,
    });
  }
}
