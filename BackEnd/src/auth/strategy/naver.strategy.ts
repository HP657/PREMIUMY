import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-naver-v2';
import { AuthService } from '../auth.service';
import * as process from 'node:process';
import { UserService } from '../../user/user.service';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_SECRET!,
      callbackURL: "http://localhost:3000/auth/naver/redirect"
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const { id, email, name, nickname } = profile;

    const user = {
      email: email || '',
      userName: name || '',
      provider: 'naver',
      socialId: id,
      nickname: nickname || '',
    };

    let foundUser = await this.userService.findBySocialIdAndProvider(user.socialId, user.provider);

    if (!foundUser) {
      foundUser = await this.userService.createUser(user);
    }

    const jwt = await this.authService.generateJwt(user);

    return { ...foundUser, jwt };
  }
}