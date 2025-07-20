import { Controller, Get, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  async userInfo(@Req() req) {
    const { provider, socialId } = req.user;
    const user = await this.userService.findByProviderSocialId(provider, socialId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

}
