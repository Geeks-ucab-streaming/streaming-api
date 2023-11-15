import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from './controllers/users.controller';
import { UsersService } from '../application/services/users.service';
import { AuthService } from '../application/auth.service';
import { UserEntity } from "./users.entity";
import { UserRepository } from './user.repository.impl';
import { findByPhoneUserService } from '../../phones/application/services/find-by-phone-user.service';
import { PhonesService } from '../../phones/application/services/phones.service';
import { PhoneRepository } from '../../phones/infrastructure/phone.repository.imp';
import { PhoneEntity } from '../../phones/infrastructure/phones.entity';
import { LineEntity } from 'src/phones/infrastructure/lines.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,PhoneEntity])],
  providers: [
    PhonesService,
    UsersService, 
    AuthService, 
    findByPhoneUserService,
    {
      provide: 'IgenericRepo',
      useClass: UserRepository,
    },
    {
      provide: 'ICreateRepository',
      useClass: PhoneRepository,
    },

    
  ], 
  controllers: [UsersController],
  
})


export class UsersModule {}
