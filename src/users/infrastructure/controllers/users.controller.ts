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
import { PhonesService } from 'src/phones/application/services/phones.service';


@Controller('api') //Recuerda que este es como un prefijo para nuestras rutas

export class UsersController {

 constructor (private usersService: UsersService, private authService: AuthService, private phonesService: PhonesService){}


 @Post("/auth/validate_operator")
 async createUser(@Body() body: CreateUserDto){
    const user= await this.authService.signup(body);
    return user;
 }

 @Get("/user/:id")
 async findUser(@Param("id") id:string){
   const user = await this.usersService.find(id);
   if(!user){
      throw new NotFoundException("user not found!");
   }
   return user; 
 }

}