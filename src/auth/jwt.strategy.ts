import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UserService } from 'src/frontend/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: any) {
    let user;
    if (payload.email) {
      user = await this.userService.findByEmail(payload.email);
    } else if (payload.sub) {
      user = await this.userService.findById(payload.sub);
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
