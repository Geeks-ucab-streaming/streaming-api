import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { CreateUserDto } from "../dtos/create-user.dto";
import { PhonesService } from "src/phones/application/services/register-users-phone.application.service";
import {Imapper} from '../../../common/Application/IMapper';
import { User } from "src/users/domain/userAggregate/user";
import { UserEntity } from "src/users/infrastructure/entities/users.entity";
import { NotFoundException } from "@nestjs/common";
import { Phone } from "src/phones/domain/phoneAggregate/phone";
import { IUserRepository } from "src/users/domain/IUserRepository";
import { UserFactory } from "src/users/domain/factories/user.factory";
import { PhoneDto } from "src/phones/application/dtos/phone.dto";
import { Result } from '../../../common/domain/logic/Result';
import { DomainException } from '../../../common/domain/exceptions/domain-exception';
import { ITokenUserRepository } from '../../domain/tokenUser.repository';
import { TokenEntity } from '../../domain/userAggregate/entities/token';
import { ItransactionHandler } from '../../../common/Application/transaction_handler/transaction_handler';

export class SignUserUpMovistar implements IApplicationService<CreateUserDto,User>{
  constructor(private phone:PhonesService,
    private findByPhoneUserService: IApplicationService<string, User>,
    private IMapper: Imapper<User,UserEntity>,
    private IMapperPhone: Imapper<Phone,PhoneDto>,
    private readonly tokenRepository: ITokenUserRepository,
    private readonly repo: IUserRepository,
    private readonly transactionHandler: ItransactionHandler
    ){}

  get name(): string {
    return this.constructor.name;
  }

  async execute(usersDto: CreateUserDto):Promise<Result<User>>{
    await this.transactionHandler.startTransaction()

    const users = await this.findByPhoneUserService.execute(usersDto.phone); 
    if(users.Value){
      throw new NotFoundException ("User Alredy exists");
    }

    let phoneMovistar = await this.phone.execute(usersDto.phone);
    if(!phoneMovistar.IsSuccess) {
      await this.transactionHandler.rollbackTransaction()
      return Result.fail<User>(new DomainException<string>(void 0,phoneMovistar.message,phoneMovistar.error,phoneMovistar.statusCode));
    }

    if(!phoneMovistar.Value.validatePrefixMovistar()){
      await this.transactionHandler.rollbackTransaction()
      return Result.fail<User>(new Error("Phone prefix is not from Movistar"));
    }

    if(!phoneMovistar.IsSuccess) return Result.fail<User>(new DomainException<string>(void 0,phoneMovistar.message,phoneMovistar.error,phoneMovistar.statusCode));
    let phoneMovistarDto = await this.IMapperPhone.domainTo(phoneMovistar.Value);
    usersDto.phone = phoneMovistarDto.phoneNumber;
    const savedUser = await this.repo.createUser(UserFactory.userFactoryMethod(phoneMovistarDto.id, phoneMovistarDto.phoneNumber, 
      phoneMovistarDto.linePhoneId, phoneMovistarDto.lineName,usersDto.token));
    const tokenEntity = TokenEntity.create(usersDto.token,savedUser.value.Id.Id);
    await this.tokenRepository.saveToken(tokenEntity)
    return savedUser;
  }
}

