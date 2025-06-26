import axios from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BadRequestException, Injectable } from 'src/bootstrap';
import {
  InvalidTokenException,
  InvalidUserProviderException,
  UserEntity,
  UserInvalidCredentialsException,
  UserProfileEntity,
  UserProfileRepository,
  UserRepository,
} from 'src/context/auth/domain';
import { AppConfigService } from 'src/global/services/app-config.service';
import { GithubSocialLoginDTO } from './github.dto';
import { AuthSharedService } from '../../shared/auth-shared.service';
import { GitHubEmail, GitHubUser } from './github.types';

@Injectable()
export class GithubSocialLoginUseCase {
  constructor(
    private readonly config: AppConfigService,
    private readonly profile: UserProfileRepository,
    private readonly user: UserRepository,
    private readonly shared: AuthSharedService,
  ) {}

  async execute(
    req: FastifyRequest,
    res: FastifyReply,
    data: GithubSocialLoginDTO,
  ) {
    if (
      !data.code ||
      !data.metadata.redirectUrl ||
      !data.metadata.redirectErrorUrl
    )
      throw new BadRequestException();

    const userInfo = await this._getGithubUserInfo(data.code);
    if (!userInfo.email) throw new InvalidUserProviderException();

    const user = await this.user.findByEmail(userInfo.email);

    if (!user) {
      const newUser = UserEntity.create({
        username: await this.shared.generateUsername(userInfo.email),
        email: userInfo.email,
        providerId: this.config.githubProviderId,
        roleId: this.config.defaultRoleId,
      });
      newUser.isEmailVerified = true;

      const newUserCreated = await this.user.create(newUser);

      await this.profile.create(
        UserProfileEntity.create({
          firstname: userInfo.name || undefined,
          user_id: newUserCreated.id,
        }),
      );

      await this.shared.sendWelcomeEmail(newUserCreated);
      await this.shared.generateSessionTokens(req, res, newUserCreated);
      res.redirect(data.metadata.redirectUrl, 302);
    } else if (user.providerId !== this.config.githubProviderId) {
      res.redirect(
        `${data.metadata.redirectErrorUrl}?error=provider_error`,
        302,
      );
    } else {
      await this.shared.generateSessionTokens(req, res, user);
      res.redirect(data.metadata.redirectUrl, 302);
    }
  }

  async _getGithubUserInfo(code: string) {
    const token = await this._getGithubAccessToken(code);

    try {
      const responseUser = await axios.get<GitHubUser>(
        'https://api.github.com/user',
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (responseUser.data.email) return responseUser.data;

      const emails = await axios.get<GitHubEmail[]>(
        'https://api.github.com/user/emails',
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const userEmail = emails.data.find((email) => email.primary);

      if (!userEmail) throw new InvalidUserProviderException();

      responseUser.data.email = userEmail.email;
      return responseUser.data;
    } catch {
      throw new InvalidTokenException();
    }
  }

  async _getGithubAccessToken(code: string) {
    const rootUrl = 'https://github.com/login/oauth/access_token';

    const options = {
      client_id: this.config.githubClientID,
      client_secret: this.config.githubClientSecret,
      code: code,
    };

    const queryString = new URLSearchParams(options);

    const response = await axios.post<string>(`${rootUrl}?${queryString}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = new URLSearchParams(response.data);
    const accessToken = data.get('access_token');

    if (data.get('error') || !accessToken)
      throw new UserInvalidCredentialsException();

    return accessToken;
  }
}
