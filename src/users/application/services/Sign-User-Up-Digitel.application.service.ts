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

export class SignUserUpDigitel implements IApplicationService<CreateUserDto,void>{
  constructor(private phone:PhonesService,
    private findByPhoneUserService: IApplicationService<string, User>,
    private IMapper: Imapper<User,UserEntity>,
    private IMapperPhone: Imapper<Phone,PhoneDto>,
    private readonly repo: IUserRepository,
    ){}

  get name(): string {
    return this.constructor.name;
  }

  async execute(usersDto: CreateUserDto){
    const users = await this.findByPhoneUserService.execute(usersDto.phone); 
    if(users.Value){
      throw new NotFoundException ("User Alredy exists");
    }
    let phoneDigitel = await this.phone.execute(usersDto.phone);
    if(!phoneDigitel.IsSuccess) return Result.fail<void>(new DomainException<string>(void 0,phoneDigitel.message,phoneDigitel.error,phoneDigitel.statusCode));

    if(!phoneDigitel.Value.validatePrefixDigitel()){
      Result.fail<User>(new Error("Phone prefix is not from Digitel"));
    }
    
    let phoneDigitelDto = await this.IMapperPhone.domainTo(phoneDigitel.Value);
    usersDto.phone = phoneDigitelDto.phoneNumber;
    const savedUser = await this.repo.createUser(UserFactory.userFactoryMethod(phoneDigitelDto.id, phoneDigitelDto.phoneNumber, 
      phoneDigitelDto.linePhoneId, phoneDigitelDto.lineName));
    return savedUser;
  }
}


