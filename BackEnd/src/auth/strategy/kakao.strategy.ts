import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_SECRET!,
      callbackURL: "http://localhost:3000/api/auth/kakao/redirect",
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const { id, username, _json } = profile;

    const user = {
      email: _json.kakao_account?.email || '',
      userName: username || '',
      provider: 'kakao',
      socialId: id,
      nickname: _json.properties?.nickname || '',
    };

    let foundUser = await this.userService.findBySocialIdAndProvider(user.socialId, user.provider);

    if (!foundUser) {
      foundUser = await this.userService.createUser(user);
    }

    const jwt = await this.authService.generateJwt(user);

    return { ...foundUser, jwt };
  }
}
