import { Body, 
  Controller, 
  Post, 
  Get, 
  Param, 
  NotFoundException, 
  Session,} from '@nestjs/common';
import { CreateUserDto } from  '../../application/dtos/create-user.dto';
import { UsersService } from "../../application/services/users.service";
import { AuthService } from "../../application/auth.service";
import { ApiTags } from '@nestjs/swagger';


//NOTA: Recuerda que Session es para manejar los cookies.
@Controller('api') //Recuerda que este es como un prefijo para nuestras rutas

export class UsersController {

 constructor (private usersService: UsersService, private authService: AuthService){}

@ApiTags('Users')
 @Post("/user")
 async createUser(@Body() body: CreateUserDto, @Session() session: any){
    const user= await this.authService.signup(body);
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