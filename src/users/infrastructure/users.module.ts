import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from '../application/services/users.service';
import { AuthService } from '../application/auth.service';
import { UserEntity } from './users.entity';
// import { UserRepository } from './user.repository.impl';
import { findByPhoneUserService } from '../../phones/application/services/find-by-phone-user.service';
import { PhonesService } from '../../phones/application/services/phones.service';
import { OrmPhoneRepository } from '../../phones/infrastructure/repositories/phone.repository.imp';
import { PhoneEntity } from '../../phones/infrastructure/phones.entity';
import { LineEntity } from 'src/phones/infrastructure/lines.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtcontanst } from '../application/constants/jwt.constansts';
import { JwtStrategy } from '../application/jwtoken/jwt.strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PhoneEntity]),
    PassportModule,
    JwtModule.register({
      secret: jwtcontanst.secret,
      signOptions: { expiresIn: '60h' },
    }),
  ],
  providers: [
    PhonesService,
    UsersService,
    AuthService,
    JwtStrategy,
    findByPhoneUserService,
    // {
    //   provide: 'IgenericRepo',
    //   useClass: UserRepository,
    // },
    {
      provide: 'ICreateRepository',
      useClass: OrmPhoneRepository,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}