import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/frontend/user/user.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_TIME, JWT_SECRET_KEY } from './constants';
import { JwtStrategy } from './jwt.strategy';
import User from 'src/entities/user.entity';

@Module({
  imports: [
    User,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: EXPIRES_TIME },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
