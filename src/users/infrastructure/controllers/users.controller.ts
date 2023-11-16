import { Body, 
  Controller, 
  Post, 
  Get, 
  Param, 
  NotFoundException,
  BadRequestException, } from '@nestjs/common';
import { CreateUserDto } from  '../../application/dtos/create-user.dto';
import { UsersService } from "../../application/services/users.service";
import { AuthService } from "../../application/auth.service";
import { ApiTags } from '@nestjs/swagger';
import { findByPhoneUserService } from '../../../phones/application/services/find-by-phone-user.service';
import { PhonesService } from 'src/phones/application/services/phones.service';
import { CreatePhoneDto } from 'src/phones/application/dtos/create-phone.dto';
import { Optional } from 'src/common/optional';
import { User } from 'src/users/domain/user';


@Controller('api') //Recuerda que este es como un prefijo para nuestras rutas

export class UsersController {

 constructor (private usersService: UsersService, private authService: AuthService, private findByPhoneUserService: findByPhoneUserService, private phonesService: PhonesService){}

 @ApiTags('Users')
 @Post("/auth/validate_operator")
 async createUser(@Body() bodyUser: CreateUserDto, @Body() bodyPhone: CreatePhoneDto){
    const users = await this.findByPhoneUserService.execute(bodyUser.phonesNumber);
    if(users){
      throw new BadRequestException("Phone already exists!");
      //Manejar excepciones con Optional 
    }
    const phone = await this.phonesService.execute(bodyPhone);
    const user = await this.authService.signup(bodyUser);
    user.phone = phone;
    return user;
 }

 @ApiTags('Users')
 @Post("/auth/login")
 async signin(@Body() body: CreateUserDto){
  const user= await this.authService.signin(body.phonesNumber);
  return user;
 }
 
 @ApiTags('Users')
 @Get("/user/:id")
 async findUser(@Param("id") id:string){
   const user = await this.usersService.find(id);
   if(!user){
      throw new NotFoundException("user not found!");
   }
   return user; 
 }

}