import { Body, 
  Controller, 
  Post, 
  Get, 
  Param, 
  NotFoundException, 
  } from '@nestjs/common';
import { CreateUserDto } from  '../../application/dtos/create-user.dto';
import { UsersService } from "../../application/services/users.service";
import { AuthService } from "../../application/auth.service";
import { ApiTags } from '@nestjs/swagger';
import { findByPhoneUserService } from 'src/phones/application/services/find-by-phone-user.service';


@Controller('api') //Recuerda que este es como un prefijo para nuestras rutas

export class UsersController {

 constructor (private usersService: UsersService, 
              private authService: AuthService, 
              private findByPhoneUserService: findByPhoneUserService){}


 @Post("/auth/validate_operator")
 async createUser(@Body() body: CreateUserDto){
    const users = await this.findByPhoneUserService.execute(body.phonesNumber);
    if(users){
      throw new Error("Phone already exists!");
      //Manejar excepciones con Optional 
    }
    const user= await this.authService.signup(body);
    return user;
 }

 @Post("/auth/login")
 async signin(@Body() body: CreateUserDto){
  const users = await this.findByPhoneUserService.execute(body.phonesNumber); 
  if(!users){
    throw new NotFoundException("User not found!");
    //Manejar excepciones con Optional 
  }
  const user= await this.authService.signin(users.id);
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