import axios from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from 'src/bootstrap';
import { AppConfigService } from 'src/global/services/app-config.service';
import {
  InvalidUserLoginException,
  UserEntity,
  UserProfileEntity,
  UserProfileRepository,
  UserRepository,
} from '../../domain';
import { GoogleSocialLoginDTO } from './google.dto';
import { AuthSharedService } from '../shared/auth-shared.service';

interface GoogleUserCredentials {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  id_token: string;
}

export interface GoogleUserInfo {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
}

@Injectable()
export class GoogleSocialLoginUseCase {
  constructor(
    private readonly config: AppConfigService,
    private readonly jwt: JwtService,
    private readonly profile: UserProfileRepository,
    private readonly shared: AuthSharedService,
    private readonly user: UserRepository,
  ) {}

  async execute(
    req: FastifyRequest,
    res: FastifyReply,
    data: GoogleSocialLoginDTO,
  ) {
    const userInfo = await this._getUserinfo(data.code);

    const user = await this.user.findByEmail(userInfo.email);

    if (!user) {
      const newUserCreated = await this.user.create(
        UserEntity.create({
          username: await this.shared.generateUsername(userInfo.email),
          email: userInfo.email,
          providerId: this.config.googleProviderId,
          roleId: this.config.defaultRoleId,
        }),
      );

      await this.profile.create(
        UserProfileEntity.create({
          firstname: userInfo.given_name || '',
          lastname: userInfo.family_name || '',
          user_id: newUserCreated.id,
        }),
      );

      this.shared.sendWelcomeEmail(newUserCreated);

      await this.shared.generateSessionTokens(req, res, newUserCreated);
      res.redirect(data.metadata.redirectUrl).send();
      return;
    }

    if (user.providerId !== this.config.googleProviderId) {
      res.redirect(
        `${data.metadata.redirectErrorUrl}?error=provider_error&provider=google`,
      );
      res.status(409).send();
      return;
    } else {
      await this.shared.generateSessionTokens(req, res, user);
      res.redirect(data.metadata.redirectUrl).send();
    }
  }

  async _getUserinfo(code: string): Promise<GoogleUserInfo> {
    try {
      const response = await axios.post<GoogleUserCredentials>(
        'https://oauth2.googleapis.com/token',
        {
          code,
          client_id: this.config.googleClientID,
          client_secret: this.config.googleClientSecret,
          redirect_uri: 'postmessage',
          grant_type: 'authorization_code',
        },
      );

      return this.jwt.decode<GoogleUserInfo>(response.data.id_token);
    } catch {
      throw new InvalidUserLoginException();
    }
  }
}
