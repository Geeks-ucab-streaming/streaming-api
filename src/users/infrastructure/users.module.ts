import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from './controllers/users.controller';
import { UsersService } from '../application/services/users.service';
import { AuthService } from '../application/auth.service';
import { UserEntity } from "./users.entity";
import { UserRepository } from './user.repository.impl';
import { findByPhoneUserService } from '../application/services/find-by-phone-user.service';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UsersService, 
    AuthService, 
    findByPhoneUserService,
    {
      provide: 'IgenericRepo',
      useClass: UserRepository,
    }
  ], 
  controllers: [UsersController],
  
})


export class UsersModule {}
