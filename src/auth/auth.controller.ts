import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  HttpStatus,
  HttpException,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ResponseData } from 'src/common/response/ResponseData';
import * as bcrypt from 'bcrypt';
import RegisterDto from './dto/register.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    try {
      const data = await this.authService.login(req.user);
      return new ResponseData(HttpStatus.OK, data, 'Login success');
    } catch (error) {
      console.log('Rrror login controller: ', error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    if (!req.user) {
      throw new HttpException(
        'User not found in request',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const { id } = req.user;
    console.log('get profile user -------');
    const data = await this.authService.showUser(id);
    return data;
  }

  @Post('register')
  public async register(
    @Body()
    registationData: RegisterDto,
  ) {
    console.log('register data: ', registationData);
    const hashedPassword = await bcrypt.hash(registationData.password, 10);
    try {
      const createUser = await this.authService.create({
        ...registationData,
        password: hashedPassword,
      });

      return new ResponseData(HttpStatus.OK, createUser, 'Register success');
    } catch (error) {
      console.log('error register controller: ', error);
      return new ResponseData(error.status, error.response, 'error');
    }
  }

  @Post('refresh-token')
  async refreshToken(@Body() { refresh_token }: { refresh_token: string }) {
    if (!refresh_token) {
      throw new BadRequestException('refresh token is required');
    }
    const user = this.authService.verifyRefreshToken(refresh_token);

    if (!user) {
      throw new BadRequestException('Invalid refresh token');
    }
    return this.authService.login(user);
  }
}
