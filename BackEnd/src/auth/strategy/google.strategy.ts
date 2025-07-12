import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            callbackURL: 'http://localhost:3000/auth/google/redirect',
            scope: ['email', 'profile'],
            passReqToCallback: false,
        });

    }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const { id, name, emails, _json } = profile;

    const user = {
      email: emails?.[0]?.value || _json?.email || '',
      userName: (name?.familyName || _json?.family_name || '') + (name?.givenName || _json?.given_name || ''),
      provider: 'google',
      socialId: id || _json?.sub,
      nickname: _json?.name || '',
    };

    let foundUser = await this.userService.findBySocialIdAndProvider(user.socialId, user.provider);

    if (!foundUser) {
      foundUser = await this.userService.createUser(user);
    }

    const jwt = await this.authService.generateJwt(foundUser);

    return { ...foundUser, jwt };
  }

}
