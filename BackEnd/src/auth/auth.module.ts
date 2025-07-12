import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { PassportModule } from '@nestjs/passport';
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategy/jwt.strategy";
import { GithubStrategy } from './strategy/github.strategy';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { NaverStrategy } from './strategy/naver.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
      PassportModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET || 'yourSecretKey',
        signOptions: { expiresIn: '1d' },
      }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GithubStrategy, KakaoStrategy, NaverStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
