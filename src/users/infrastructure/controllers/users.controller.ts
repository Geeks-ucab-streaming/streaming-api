import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UsersService } from '../../application/services/users.service';
import { AuthService } from '../../application/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { findByPhoneUserService } from '../../../phones/application/services/find-by-phone-user.service';
import { PhonesService } from 'src/phones/application/services/phones.service';
import { CreatePhoneDto } from 'src/phones/application/dtos/create-phone.dto';
import { Optional } from 'src/common/optional';
import { User } from 'src/users/domain/userAggregate/user';
import { Result } from 'src/common/domain/logic/Result';
import { JwtAuthGuard } from 'src/users/application/jwtoken/jwt-auth.guard';
import { OrmUserRepository } from '../user.repository.impl';
import { OrmPhoneRepository } from 'src/phones/infrastructure/repositories/phone.repository.imp';
import { DataSourceSingleton } from 'src/core/infrastructure/dataSourceSingleton';
import { OrmLineRepository } from 'src/phones/infrastructure/repositories/prefixes.repository.imp';
import { JwtService } from '@nestjs/jwt';
import { phoneMapper } from 'src/phones/infrastructure/mapper/phone.mapper';
import { UsersMapper } from '../mappers/User.mapper';

@ApiBearerAuth()
@Controller('api') //Recuerda que este es como un prefijo para nuestras rutas
export class UsersController {

  private findByPhoneUserService: findByPhoneUserService;
  private usersMapper: UsersMapper = new UsersMapper();
  private userRepository: OrmUserRepository = new OrmUserRepository(this.usersMapper);
  private ormPhoneMapper: phoneMapper = new phoneMapper();
  private phoneRepository: OrmPhoneRepository = new OrmPhoneRepository(DataSourceSingleton.getInstance(),this.ormPhoneMapper);
  private lineRepository: OrmLineRepository = new OrmLineRepository(DataSourceSingleton.getInstance());
  private usersService: UsersService;
  private authService: AuthService;
  private phonesService: PhonesService;
  private jwtService: JwtService

  constructor() {
    this.phonesService = new PhonesService(this.phoneRepository, this.lineRepository);
    this.usersService = new UsersService(this.userRepository);
    this.findByPhoneUserService = new findByPhoneUserService(this.userRepository);
    this.authService = new AuthService(this.usersService,this.phonesService,this.findByPhoneUserService,this.usersMapper);
    
  }

  @ApiTags('Users')
  @Post('/auth/validate_operator')
  async createUser(@Body() body: CreateUserDto) {
    this.findByPhoneUserService = new findByPhoneUserService(
      this.userRepository,
    );
    try {
      const users = await this.findByPhoneUserService.execute(
        body.phone,
      );
        
      if (users) {
        throw new BadRequestException('Phone already exists!');
        //Manejar excepciones con Optional
      }
      const user = await this.authService.signup(body);
      return Result.success<User>(users.Value);
    } catch (error) {
      console.log(error);
      return Result.fail<User>(error);
    }
  }

  @ApiTags('Users')
  @Post('/auth/login')
  async signin(@Body() body: CreateUserDto) {

    const data = await this.authService.signin(body.phone);
    const jwt = this.jwtService.sign(data);

    return {
      token: jwt
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Users')
  @Get('/user/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.find(id);
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    return user;
  }
  @ApiTags('Users')
  @Post('/users/prueba')
  async pruebita(@Body() body: CreatePhoneDto) {
    const users = await this.phonesService.execute(body);
    console.log(users)
    return users;
  }
}
