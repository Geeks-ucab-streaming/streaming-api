import { Body, 
  Controller, 
  Post, 
  Get, 
  Param, 
  NotFoundException,
  BadRequestException,
  UseGuards, } from '@nestjs/common';
import { CreateUserDto } from  '../../application/dtos/create-user.dto';
import { UsersService } from "../../application/services/users.service";
import { AuthService } from "../../application/auth.service";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { findByPhoneUserService } from '../../../phones/application/services/find-by-phone-user.service';
import { PhonesService } from 'src/phones/application/services/phones.service';
import { CreatePhoneDto } from 'src/phones/application/dtos/create-phone.dto';
import { Optional } from 'src/common/optional';
import { User } from 'src/users/domain/user';
import { Result } from 'src/common/domain/logic/Result';
import { JwtAuthGuard } from 'src/users/application/jwtoken/jwt-auth.guard';

@ApiBearerAuth()
@Controller('api') //Recuerda que este es como un prefijo para nuestras rutas

export class UsersController {

 constructor (private usersService: UsersService, private authService: AuthService, private findByPhoneUserService: findByPhoneUserService, private phonesService: PhonesService){}

 @ApiTags('Users')
 @Post("/auth/validate_operator")
 async createUser(@Body() body: CreateUserDto){
  try {
    const users = await this.findByPhoneUserService.execute(body.phonesNumber);
   
    if(users){
      throw new BadRequestException("Phone already exists!");
      //Manejar excepciones con Optional 
    }
    const user = await this.authService.signup(body);
    return Result.ok<User>(users);
  } catch (error) {
    console.log(error);
    return Result.fail<User>(error,);
  }

 }

 @ApiTags('Users')
 @Post("/auth/login")
 async signin(@Body() body: CreateUserDto){
  const data = await this.authService.signin(body.phonesNumber);

  return data;
 }
 
 @UseGuards(JwtAuthGuard)
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