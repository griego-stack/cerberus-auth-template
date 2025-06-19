import { ConfigService } from '@nestjs/config';
import { Injectable } from 'src/bootstrap';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  //   App Configuration

  get globalPrefix(): string {
    return 'api';
  }

  get port(): number {
    return this.config.get<number>('PORT') || 8000;
  }

  get jwt_expiresIn(): string | number {
    return '1d';
  }

  // Secrets

  get jwt_secret_key(): string {
    return this.config.get<string>('JWT_SECRET_KEY') || 'default_secret_key';
  }

  // Client Configuration

  get clients_url(): string[] {
    return [this.config.get<string>('CLIENT_URL') || 'http://localhost:3000'];
  }
}
