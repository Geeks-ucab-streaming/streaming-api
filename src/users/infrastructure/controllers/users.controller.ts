import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Patch, Req,
} from '@nestjs/common';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { findByPhoneUserService } from '../../../phones/application/services/find-by-phone-user.application.service';
import { PhonesService } from 'src/phones/application/services/register-users-phone.application.service';
import { JwtAuthGuard } from 'src/users/application/jwtoken/jwt-auth.guard';
import { OrmUserRepository } from '../repositories/user.repository.impl';
import { OrmPhoneRepository } from 'src/phones/infrastructure/repositories/phone.repository.imp';
import { DataSourceSingleton } from 'src/common/infrastructure/dataSourceSingleton';
import { OrmLineRepository } from 'src/phones/infrastructure/repositories/prefixes.repository.imp';
import { JwtService } from '@nestjs/jwt';
import { phoneMapper } from 'src/phones/infrastructure/mapper/phone.mapper';
import { UsersMapper } from '../mappers/User.mapper';
import { ErrorApplicationServiceDecorator } from 'src/common/Application/application-service/decorators/error-decorator/error-application.service.decorator';
import { UpdateUserDto } from 'src/users/application/dtos/update-user.dto';
import { SignUserUpMovistar } from 'src/users/application/services/Sign-User-Up-Movistar.application.service';
import { SignUserIn } from 'src/users/application/services/Sign-User-In.application.service';
import { FindUserById } from 'src/users/application/services/Find-User-By-Id.application.service';
import { UpdateUserById } from 'src/users/application/services/Update-User-By-id.application.service';
import { UpdateUser } from 'src/users/application/ParameterObjects/updateUser';
import { UsersForDtoMapper } from '../mappers/UserForDto.mapper';
import { SignUserUpDigitel } from 'src/users/application/services/Sign-User-Up-Digitel.application.service';
import { PhoneAndDtoMapper } from 'src/phones/infrastructure/mapper/phoneAndDto.mapper';
import { LoggingApplicationServiceDecorator } from 'src/common/Application/application-service/decorators/error-decorator/loggin-application.service.decorator';
import { NestLogger } from 'src/common/infrastructure/logger/nest-logger';
import { jwtcontanst } from '../../application/constants/jwt.constansts';

@ApiBearerAuth()
@Controller('api') //Recuerda que este es como un prefijo para nuestras rutas
export class UsersController {
  private findByPhoneUserService: findByPhoneUserService;
  private usersMapper: UsersMapper = new UsersMapper();
  private userRepository: OrmUserRepository = new OrmUserRepository(
    this.usersMapper,
  );
  private ormPhoneMapper: phoneMapper = new phoneMapper();
  private phoneRepository: OrmPhoneRepository = new OrmPhoneRepository(
    DataSourceSingleton.getInstance(),
    this.ormPhoneMapper,
  );
  private lineRepository: OrmLineRepository = new OrmLineRepository(
    DataSourceSingleton.getInstance(),
  );
  private phonesService: PhonesService;
  private jwtService: JwtService = new JwtService();
  private signUserUpMovistar: SignUserUpMovistar;
  private signUserUpDigitel: SignUserUpDigitel;
  private signUserIn: SignUserIn;
  private findUserById: FindUserById;
  private updateUserById: UpdateUserById;
  private updateUserParameterObjetc: UpdateUser;
  private userMapperForDomainAndDtos: UsersForDtoMapper;
  private phoneDtoMapper: PhoneAndDtoMapper;

  constructor() {
    this.phonesService = new PhonesService(
      this.phoneRepository,
      this.lineRepository,
    );
    this.findByPhoneUserService = new findByPhoneUserService(
      this.userRepository,
    );
    this.signUserIn = new SignUserIn(this.findByPhoneUserService);
    this.findUserById = new FindUserById(this.userRepository);
    this.updateUserById = new UpdateUserById(this.userRepository);
    this.userMapperForDomainAndDtos = new UsersForDtoMapper();
    this.phoneDtoMapper = new PhoneAndDtoMapper();
  }

  //Registro de Usuario con su número de teléfono
  @ApiTags('Users')
  @Post('/auth/sign-up/movistar')
  async createUserMovistar(@Body() body: CreateUserDto) {
    const phoneService = this.findByPhoneUserService;
    const serviceMovistar = new LoggingApplicationServiceDecorator(
      new SignUserUpMovistar(
        this.phonesService,
        phoneService,
        this.usersMapper,
        this.phoneDtoMapper,
        this.userRepository,
      ),
      new NestLogger(),
    );
   /* const result = await service.execute(body);
    
    const userPayload = this.userMapperForDomainAndDtos.domainTo(result.Value);
    return {
      id: (await userPayload).id,
      phone: (await userPayload).phone.phoneNumber,
    };*/

    const result = await serviceMovistar.execute(body);
    if(result.IsSuccess){
      let dto: CreateUserDto = new CreateUserDto();
      dto.phone = result.Value.Phone.PhoneNumber.phoneNumber;
      const sign = await this.signin(dto);
      return {
        data:{
          token : sign.token
        },
        statusCode: result.statusCode,
      };
    }else{
      return result
    }
  }

  @ApiTags('Users')
  @Post('/auth/sign-up/digitel')
  async createUserDigitel(@Body() body: CreateUserDto) {
    const phoneService = this.findByPhoneUserService;
    const service = new LoggingApplicationServiceDecorator(
      new SignUserUpDigitel(
        this.phonesService,
        phoneService,
        this.usersMapper,
        this.phoneDtoMapper,
        this.userRepository,
      ),
      new NestLogger(),
    );
    const result = await service.execute(body);

    /*const userPayload = this.userMapperForDomainAndDtos.domainTo(result.Value);
    return {
      id: (await userPayload).id,
      phone: (await userPayload).phone.phoneNumber,*/
      if(result.IsSuccess){
        let dto: CreateUserDto = new CreateUserDto();
        dto.phone = result.Value.Phone.PhoneNumber.phoneNumber;
        const sign = await this.signin(dto);
        return {
          data:{
            token : sign.token
          },
          statusCode: result.statusCode,
        };
      }else{
        return result
      }
    }


  //Inicio de Sesión
  @ApiTags('Users')
  @Post('/auth/login')
  async signin(@Body() body: CreateUserDto) {
    const data = await this.signUserIn.execute(body.phone);
    const jwt = this.jwtService.sign({data: data.Value.Id.Id}, {secret: jwtcontanst.secret});

    return {
      token: jwt,
    };
  }

  //Obtener usuario en base a su ID
  @UseGuards(JwtAuthGuard)
  @ApiTags('Users')
  @Get('/user/:id')
  async findUser(@Param('id') id: string) {
    //await this.userRepository.findAll();
    const user = await this.findUserById.execute(id);
    if (!user) throw user.Error;
    const userPayload = this.userMapperForDomainAndDtos.domainTo(user.Value);
    return {
      id: (await userPayload).id,
      phone: (await userPayload).phone.phoneNumber,
      email: (await userPayload).email,
      name: (await userPayload).name,
      birthDate: (await userPayload).birth_date,
      gender: (await userPayload).gender,
    };
  }

  //Actualizar usuario en base a su ID
  @ApiTags('Users')
  @Patch('/user/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    this.updateUserParameterObjetc = new UpdateUser(
      id,
      body,
      this.userMapperForDomainAndDtos,
    );
    return this.updateUserById.execute(this.updateUserParameterObjetc);
  }

}
