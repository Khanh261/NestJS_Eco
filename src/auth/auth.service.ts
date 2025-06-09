import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/frontend/user/user.service';
import * as bcrypt from 'bcrypt';
import RegisterDto from './dto/register.dto';
import { EXPIRES_TIME } from './constants';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);

    if (!user) return null;

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) return null;

    const plainUser = { ...user };
    delete plainUser.password;

    return plainUser;
  }

  async login(user: any) {
    console.log('---------Auth Service Login: ', user);
    const payload = { username: user.username, sub: user.id };
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: EXPIRES_TIME,
    });

    this.userService.saveRefreshToken(refresh_token, user.id);
    const expiresTime = 100;
    const { password, ...safeUser } = user;

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refresh_token,
      user: safeUser,
      expires_in: moment().add(expiresTime, 'days'),
    };
  }

  async showUser(id: number) {
    return await this.userService.findById(id);
  }

  async create(userDto: RegisterDto) {
    const checkUsername = await this.userService.findOneByUsername(
      userDto.phone,
    );
    if (checkUsername) {
      throw new HttpException(
        'Phone number already exists ${userDto.phone}',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const checkEmail = await this.userService.findOneByUsername(userDto.email);
    if (checkEmail) {
      throw new HttpException(
        'Email already exists ${userDto.email}',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const checkPhone = await this.userService.findOneByUsername(userDto.phone);
    if (checkPhone) {
      throw new HttpException(
        'Phone number already exists ${userDto.phone}',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const user = await this.userService.register(userDto);
    if (user) {
      return this.login(user);
    }
    throw new HttpException(
      'Error when create user',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async verifyRefreshToken(refresh_token: string) {
    const decode_token = this.jwtService.decode(refresh_token);
    if (decode_token) {
      const user = await this.userService.verifyRefreshToken(
        refresh_token,
        decode_token.sub,
      );
      if (user) {
        return user;
      }
    }
    return false;
  }
}
