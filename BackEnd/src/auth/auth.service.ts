import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(user: any): Promise<string> {
    const payload = {
      email: user.email,
      userName: user.userName,
      provider: user.provider,
      socialId: user.socialId,
      nickname: user.nickname,
    };
    return this.jwtService.sign(payload);
  }
}