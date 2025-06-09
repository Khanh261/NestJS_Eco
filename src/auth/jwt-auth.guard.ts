import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info): any {
    if (err || !user) {
      console.log('JWT authentication error:', err, info);
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
