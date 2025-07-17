import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Profile, Strategy } from 'passport-github2';
import { UserService } from '../../user/user.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      callbackURL: 'http://localhost:3000/apiauth/github/redirect',
      scope: ['user:email'],
    });
  }


  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, username, displayName, emails } = profile;

    const user = {
      email: emails?.[0]?.value ?? '',
      userName: displayName ?? '',
      provider: 'github',
      socialId: id,
      nickname: username ?? '',
    };

    let foundUser = await this.userService.findBySocialIdAndProvider(user.socialId, user.provider);

    if (!foundUser) {
      foundUser = await this.userService.createUser(user);
    }

    const jwt = await this.authService.generateJwt(user);

    return { ...foundUser, jwt };
  }

}