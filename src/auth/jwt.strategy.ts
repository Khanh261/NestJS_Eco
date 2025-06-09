import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/frontend/user/user.service';
import { JWT_SECRET_KEY } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET_KEY,
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
      console.log('User not found for JWT validation:', payload);
      throw new UnauthorizedException();
    }
    return user;
  }
}
