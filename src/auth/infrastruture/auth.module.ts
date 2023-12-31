import { Module } from '@nestjs/common';
import { AppController } from '../../app.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtcontanst } from 'src/users/application/constants/jwt.constansts';
import { JwtStrategy } from 'src/users/application/jwtoken/jwt.strategies';
// import { LocalStrategy } from './local.strategyy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: jwtcontanst.secret,
          signOptions: {
            expiresIn: '24h',
          },
        };
      },
    }),
  ],
  providers: [
    // LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AppController],
})
export class AuthModule {}
