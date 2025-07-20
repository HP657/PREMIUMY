import { Controller, Get, UseGuards, Req, Res, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @Public()
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<void> {}

  @Get('google/redirect')
  @Public()
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res: Response): Promise<void> {
    const jwt: string = req.user.jwt;

    res.cookie('jwt', jwt, {
      httpOnly: true,
      secure: false, // 개발 환경이면 false, 배포시 https면 true
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일 유효기간 예시
    });

    res.redirect('http://localhost:5173/');
  }

  @Get('github')
  @Public()
  @UseGuards(AuthGuard('github'))
  async githubLogin(): Promise<void> {}

  @Get('github/redirect')
  @Public()
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Req() req, @Res() res: Response): Promise<void> {
    const jwt: string = req.user.jwt;

    res.cookie('jwt', jwt, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.redirect('http://localhost:5173/');
  }

  @Get('kakao')
  @Public()
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(): Promise<void> {}

  @Get('kakao/redirect')
  @Public()
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallback(@Req() req, @Res() res: Response): Promise<void> {
    const jwt: string = req.user.jwt;

    res.cookie('jwt', jwt, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.redirect('http://localhost:5173/');
  }

  @Get('naver')
  @Public()
  @UseGuards(AuthGuard('naver'))
  async naverLogin(): Promise<void> {}

  @Get('naver/redirect')
  @Public()
  @UseGuards(AuthGuard('naver'))
  async naverLoginCallback(@Req() req, @Res() res: Response): Promise<void> {
    const jwt: string = req.user.jwt;

    res.cookie('jwt', jwt, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.redirect('http://localhost:5173/');
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource() {
    return 'JWT is working!';
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: false,
    });
    return { message: 'Logged out successfully' };
  }

}
