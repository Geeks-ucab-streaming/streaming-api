import { Module } from '@nestjs/common';
import { AuthService } from '../aplication/auth.service';
import { AppController } from '../../app.controller';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategies';
import { jwtcontanst } from './jwt.constansts';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: jwtcontanst.secret,signOptions: {
            expiresIn: '10h',
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
