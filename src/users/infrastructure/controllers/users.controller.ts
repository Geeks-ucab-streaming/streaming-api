import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  NotFoundException,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { findByPhoneUserService } from '../../../phones/application/services/find-by-phone-user.service';
import { PhonesService } from 'src/phones/application/services/phones.service';
import { JwtAuthGuard } from 'src/users/application/jwtoken/jwt-auth.guard';
import { OrmUserRepository } from '../repositories/user.repository.impl';
import { OrmPhoneRepository } from 'src/phones/infrastructure/repositories/phone.repository.imp';
import { DataSourceSingleton } from 'src/core/infrastructure/dataSourceSingleton';
import { OrmLineRepository } from 'src/phones/infrastructure/repositories/prefixes.repository.imp';
import { JwtService } from '@nestjs/jwt';
import { phoneMapper } from 'src/phones/infrastructure/mapper/phone.mapper';
import { UsersMapper } from '../mappers/User.mapper';
import { ErrorApplicationServiceDecorator } from 'src/common/Application/application-service/decorators/error-decorator/error-application.service.decorator';
import { UpdateUserDto } from 'src/users/application/dtos/update-user.dto';
import { SignUserUp } from 'src/users/application/services/Sign-User-Up.application.service';
import { SignUserIn } from 'src/users/application/services/Sign-User-In.application.service';
import { FindUserById } from 'src/users/application/services/Find-User-By-Id.application.service';
import { UpdateUserById } from 'src/users/application/services/Update-User-By-id.application.service';
import { UpdateUser } from 'src/users/application/ParameterObjects/updateUser';

@ApiBearerAuth()
@Controller('api') //Recuerda que este es como un prefijo para nuestras rutas
export class UsersController {

  private findByPhoneUserService: findByPhoneUserService;
  private usersMapper: UsersMapper = new UsersMapper();
  private userRepository: OrmUserRepository = new OrmUserRepository(this.usersMapper);
  private ormPhoneMapper: phoneMapper = new phoneMapper();
  private phoneRepository: OrmPhoneRepository = new OrmPhoneRepository(DataSourceSingleton.getInstance(),this.ormPhoneMapper);
  private lineRepository: OrmLineRepository = new OrmLineRepository(DataSourceSingleton.getInstance());
  private phonesService: PhonesService;
  private jwtService: JwtService
  private signUserUp: SignUserUp;
  private signUserIn: SignUserIn;
  private findUserById: FindUserById;
  private updateUserById: UpdateUserById;
  private updateUserParameterObjetc: UpdateUser;

  constructor() {
    this.phonesService = new PhonesService(this.phoneRepository, this.lineRepository);
    this.signUserUp = new SignUserUp(this.phonesService,this.findByPhoneUserService,this.usersMapper,this.userRepository);
    this.signUserIn = new SignUserIn(this.findByPhoneUserService);
    this.findByPhoneUserService = new findByPhoneUserService(this.userRepository);
    this.findUserById = new FindUserById(this.userRepository);
    this.updateUserById = new UpdateUserById(this.userRepository);
  }
  
  //Registro de Usuario con su número de teléfono
  @ApiTags('Users')
  @Post('/auth/validate_operator')
  async createUser(@Body() body: CreateUserDto) {
    this.findByPhoneUserService = new findByPhoneUserService(
      this.userRepository,
    )
      const phoneService = new ErrorApplicationServiceDecorator(this.findByPhoneUserService);
      const service= new ErrorApplicationServiceDecorator(
      new SignUserUp(this.phonesService,phoneService,this.usersMapper,this.userRepository));
        
      const result = await service.execute(body);
      return result; 
  }

  //Inicio de Sesión
  @ApiTags('Users')
  @Post('/auth/login')
  async signin(@Body() body: CreateUserDto) {

    const data = await this.signUserIn.execute(body.phone);
    const jwt = this.jwtService.sign(data);

    return {
      token: jwt
    };
  }

  //Obtener usuario en base a su ID
  @UseGuards(JwtAuthGuard)
  @ApiTags('Users')
  @Get('/user/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.findUserById.execute(id);
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    return user;
  }

  //Actualizar usuario en base a su ID
  @ApiTags('Users')
  @Patch ("/user/:id")
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto){
    this.updateUserParameterObjetc = new UpdateUser(id,body,this.usersMapper);
    return this.updateUserById.execute(this.updateUserParameterObjetc);
  }

}
  


