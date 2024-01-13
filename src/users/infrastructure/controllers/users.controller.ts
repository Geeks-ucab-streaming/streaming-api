import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Patch, Req, NotFoundException, Headers,
} from '@nestjs/common';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { ApiBearerAuth, ApiHeader, ApiHeaders, ApiTags } from '@nestjs/swagger';
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
import { UpdateUserDto } from 'src/users/application/dtos/update-user.dto';
import { SignUserUpMovistar } from 'src/users/application/services/Sign-User-Up-Movistar.application.service';
import { SignUserIn } from 'src/users/application/services/Sign-User-In.application.service';
import { FindUserById } from 'src/users/application/services/Find-User-By-Id.application.service';
import { UpdateUserById } from 'src/users/application/services/Update-User-By-id.application.service';
import { ParameterObjectUser } from 'src/users/application/ParameterObjects/updateUser';
import { UsersForDtoMapper } from '../mappers/UserForDto.mapper';
import { SignUserUpDigitel } from 'src/users/application/services/Sign-User-Up-Digitel.application.service';
import { LoggingApplicationServiceDecorator } from 'src/common/Application/application-service/decorators/error-decorator/loggin-application.service.decorator';
import { NestLogger } from 'src/common/infrastructure/logger/nest-logger';
import { jwtcontanst } from '../../application/constants/jwt.constansts';
import { OrmTokenRepository } from '../repositories/token.repository.impl';
import { TokenMapper } from '../mappers/token.mapper';
import { TransactionHandlerImplementation } from '../../../common/infrastructure/transaction_handler_implementation';
import { CancelUsersSubscription } from 'src/users/application/services/Cancel-Users-Subscription.service';

@ApiBearerAuth()
@Controller('api') //Recuerda que este es como un prefijo para nuestras rutas
export class UsersController {
  private findByPhoneUserService: findByPhoneUserService;
  private usersMapper: UsersMapper = new UsersMapper();
  private tokenMapper:TokenMapper = new TokenMapper();
  private userRepository: OrmUserRepository = new OrmUserRepository(
    this.usersMapper,
  );
  private transactionHandler  = new TransactionHandlerImplementation(DataSourceSingleton.getInstance().createQueryRunner())
  private ormPhoneMapper: phoneMapper = new phoneMapper();
  private phoneRepository: OrmPhoneRepository = new OrmPhoneRepository(DataSourceSingleton.getInstance(),this.ormPhoneMapper,);
  private tokenRepository = new OrmTokenRepository(this.tokenMapper);
  private lineRepository: OrmLineRepository = new OrmLineRepository(DataSourceSingleton.getInstance());
  private phonesService: PhonesService;
  private jwtService: JwtService = new JwtService();
  private signUserIn: SignUserIn;
  private findUserById: FindUserById;
  private updateUserById: UpdateUserById;
  private updateUserParameterObjetc: ParameterObjectUser<UpdateUserDto>;
  private userMapperForDomainAndDtos: UsersForDtoMapper;
  private cancelUsersSubscription: CancelUsersSubscription;

  constructor() {
    this.phonesService = new PhonesService(this.phoneRepository,this.lineRepository,this.transactionHandler);
    this.findByPhoneUserService = new findByPhoneUserService(this.userRepository);
    this.phonesService = new PhonesService(
      this.phoneRepository,
      this.lineRepository,
      this.transactionHandler,
    );
    this.findByPhoneUserService = new findByPhoneUserService(
      this.userRepository,
    );
    this.signUserIn = new SignUserIn(this.findByPhoneUserService);
    this.findUserById = new FindUserById(this.userRepository);
    this.updateUserById = new UpdateUserById(this.userRepository,this.transactionHandler);
    this.userMapperForDomainAndDtos = new UsersForDtoMapper();
    this.cancelUsersSubscription = new CancelUsersSubscription(this.userRepository, this.transactionHandler);
  }

  //Generar Token para usuario invitado
  @ApiTags('Users')
  @ApiHeader({
    name: 'device_token',
    description: 'Token device from firebase',
  })
  @Post('/auth/log-in/guest')
  async createGuest(@Headers() headers:Headers) {
    const device_token = headers['device_token'];
    const jwt = this.jwtService.sign({id: "asdfgh123456"}, {secret: jwtcontanst.secret, expiresIn: '24h'});

    return {
      data:{
        token : jwt
      },
      statusCode: 200,
    };
  }

  //Registro de Usuario con su número de teléfono
  @ApiTags('Users')
  @ApiHeader({
    name: 'device_token',
    description: 'Token device from firebase',
  })
  @Post('/auth/sign-up/movistar')
  async createUserMovistar(@Body() body: CreateUserDto, @Headers() headers:Headers) {
    const device_token = headers['device_token']
    body.token = device_token
    const phoneService = this.findByPhoneUserService;
    const serviceMovistar = new LoggingApplicationServiceDecorator(
      new SignUserUpMovistar(
        this.phonesService,
        phoneService,
        this.tokenRepository,
        this.userRepository,
        this.transactionHandler,
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
          token : sign.data.token
        },
        statusCode: result.statusCode || 200,
      };
    }else{
      return result
    }
  }

  @ApiTags('Users')
  @ApiHeader({
    name: 'device_token',
    description: 'Token device from firebase',
  })
  @Post('/auth/sign-up/digitel')
  async createUserDigitel(@Body() body: CreateUserDto , @Headers() headers:Headers) {
    const device_token = headers['device_token']
    body.token = device_token

    const phoneService = this.findByPhoneUserService;
    const service = new LoggingApplicationServiceDecorator(
      new SignUserUpDigitel(
        this.phonesService,
        phoneService,
        this.tokenRepository,
        this.userRepository,
        this.transactionHandler,
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
        const sign = await this.signin(dto,);
        return {
          data:{
            token : sign.data?.token
          },
          statusCode: 200 ,
        };
      }else{
        return result
      }
    }


  //Inicio de Sesión
  @ApiTags('Users')
  @Post('/auth/log-in')
  async signin(@Body() body: CreateUserDto) {
    const data = await this.signUserIn.execute(body.phone);

    if (!data.IsSuccess) {
      return {
        data: {
          message: data.message,
          error : data.error,
        },
        statusCode: data.statusCode || 200,
      }
    }
    const jwt = this.jwtService.sign({id: data.Value.Id.Id}, {secret: jwtcontanst.secret, expiresIn: '24h'});

    return {
      data:{
        token:jwt
      },statusCode:data.statusCode || 200
    };
  }

  //Obtener usuario en base a su ID
  @UseGuards(JwtAuthGuard)
  @ApiTags('Users')
  @Get('/user')
  async findUser(@Req() req:Request, @Headers() headers:Headers) {

    const token = req.headers['authorization']?.split(' ')[1] ?? '';
    const id = await this.jwtService.decode(token).id;
    const user = await this.findUserById.execute(id);
    if (!user.value) throw new NotFoundException('User not found');
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

  //Cancelar la suscripción de un usuario
  @UseGuards(JwtAuthGuard)
  @ApiTags('Users')
  @Post('/subscription/cancel')
  async cancelSubscription(@Req() req:Request, @Headers() headers:Headers) {
    const token = req.headers['authorization']?.split(' ')[1] ?? '';
    const id = await this.jwtService.decode(token).id;
    const user = await this.findUserById.execute(id);
    if (!user.value)
    throw new NotFoundException('User not found');
    const result = await this.cancelUsersSubscription.execute(user.Value.Id);
    return {
      data: result.value,
      statusCode: result.statusCode || 200,
      message: "User's subscription canceled",
    }
  }

  //Actualizar usuario en base a su ID
  @UseGuards(JwtAuthGuard)
  @ApiTags('Users')
  @Patch('/user')
  async updateUser(@Req() req:Request, @Headers() headers:Headers, @Body() body: UpdateUserDto) {
    const token = req.headers['authorization']?.split(' ')[1] ?? '';
    const id = await this.jwtService.decode(token).id;
    this.updateUserParameterObjetc = new ParameterObjectUser(id,body,this.userMapperForDomainAndDtos);
    const result = await this.updateUserById.execute(this.updateUserParameterObjetc);
    return {
      data: result.value,
      statusCode: result.statusCode || 200,
      message: result.message,

    }
  }
}