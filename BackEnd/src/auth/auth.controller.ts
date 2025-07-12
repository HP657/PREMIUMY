import {Controller, Get, UseGuards, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
    async googleLogin(): Promise<void> {
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res): Promise<void> {
    const jwt: string = req.user.jwt;
    jwt ? res.redirect('http://localhost:3000/' + jwt) : res.redirect('http://localhost:3000/fail');
  }


  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin(): Promise<void> {}

  @Get('github/redirect')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Req() req, @Res() res): Promise<void> {
    const jwt: string = req.user.jwt;
    jwt ? res.redirect('http://localhost:3000/' + jwt) : res.redirect('http://localhost:3000/fail');
  }


  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(): Promise<void> {}

  @Get('kakao/redirect')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallback(@Req() req, @Res() res): Promise<void> {
    const jwt: string = req.user.jwt;
    jwt ? res.redirect('http://localhost:3000/' + jwt) : res.redirect('http://localhost:3000/fail');
  }

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  async naverLogin(): Promise<void> {}

  @Get('naver/redirect')
  @UseGuards(AuthGuard('naver'))
  async naverLoginCallback(@Req() req, @Res() res): Promise<void> {
    const jwt: string = req.user.jwt;
    jwt ? res.redirect('http://localhost:3000/' + jwt) : res.redirect('http://localhost:3000/fail');
  }


  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource() {
    return 'JWT is working!';
  }
}
