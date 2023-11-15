import { Body, 
  Controller, 
  Post, 
  Get, 
  Param, 
  NotFoundException, } from '@nestjs/common';
import { CreateUserDto } from  '../../application/dtos/create-user.dto';
import { UsersService } from "../../application/services/users.service";
import { AuthService } from "../../application/auth.service";
import { ApiTags } from '@nestjs/swagger';
import { findByPhoneUserService } from '../../../phones/application/services/find-by-phone-user.service';
import { PhonesService } from 'src/phones/application/services/phones.service';
import { CreatePhoneDto } from 'src/phones/application/dtos/create-phone.dto';


@Controller('api') //Recuerda que este es como un prefijo para nuestras rutas

export class UsersController {

 constructor (private usersService: UsersService, private authService: AuthService, private findByPhoneUserService: findByPhoneUserService, private phonesService: PhonesService){}

 @ApiTags('Users')
 @Post("/auth/validate_operator")
 async createUser(@Body() body: CreateUserDto, @Body() bodyPhone: CreatePhoneDto){
    const users = await this.findByPhoneUserService.execute(body.phonesNumber);
    if(users){
      throw new Error("Phone already exists!");
      //Manejar excepciones con Optional 
    }
    const phone = await this.phonesService.execute(bodyPhone);
    const user= await this.authService.signup(body);
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