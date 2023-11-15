import { Body, 
  Controller, 
  Post, 
  Get, 
  Param, 
  NotFoundException, 
  Session,
  Inject,} from '@nestjs/common';
import { CreateUserDto } from  '../../application/dtos/create-user.dto';
import { UsersService } from "../../application/services/users.service";
import { AuthService } from "../../application/auth.service";
import { ApiTags } from '@nestjs/swagger';
import { findByPhoneUserService } from 'src/users/application/services/find-by-phone-user.service';
import { User } from 'src/users/domain/user';


//NOTA: Recuerda que Session es para manejar los cookies.
@Controller('api') //Recuerda que este es como un prefijo para nuestras rutas

export class UsersController {

 constructor (
  private readonly usersService: UsersService, 
  private readonly authService: AuthService,
  private readonly phoneService: findByPhoneUserService
  ){}

@ApiTags('Users')
 @Post("/user")
 async createUser(@Body() body: CreateUserDto, @Session() session: any){
  console.log(body)
  const user = await this.phoneService.execute(body.phonesNumber);
    console.log(user);
    //TODO: Hacer los responses con una etructura de datos.
    return "hoal";
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