import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Home')
export class AppController {
  @Get()
  getRoot(): string {
    return 'Welcome to your NestJS app!';
  }
}
