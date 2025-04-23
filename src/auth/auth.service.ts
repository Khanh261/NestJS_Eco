import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/frontend/user/user.service';
import RegisterDto from './dto/Register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    console.log('---------user: ', user);
    if (user) {
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (isMatchPassword) {
        const { password, ...result } = user;
        return result;
      }
      throw new HttpException(
        'Password ${password} not match',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    throw new HttpException(
      'User ${username} not found',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async login(user: any) {
    console.log('---------Auth Service Login: ', user);
    const payload = { username: user.phone, sub: user.id };
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '1d',
    });

    this.userService.saveRefreshToken(refresh_token, user.id);

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refresh_token,
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
