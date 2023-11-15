import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from './controllers/users.controller';
import { UsersService } from '../application/services/users.service';
import { AuthService } from '../application/auth.service';
import { UserEntity } from "./users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  exports: [UsersService, AuthService ],
  providers: [
    UsersService, 
    AuthService, 
  ],
})


export class UsersModule {}
