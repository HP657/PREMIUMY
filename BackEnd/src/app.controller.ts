import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':token')
  getHello(): string {
    return "Hello World!";
  }

  @Get('/fail')
  fail(): string {
    return "Fail";
  }
}
