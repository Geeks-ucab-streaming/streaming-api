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
import { UserSnapShot } from "src/users/domain/parameterObjects/user-snapshot";

export class SignUserUpMovistar implements IApplicationService<CreateUserDto,void>{
  constructor(private phone:PhonesService,
    private findByPhoneUserService: IApplicationService<string, User>,
    private IMapper: Imapper<User,UserEntity>,
    private IMapperPhone: Imapper<Phone,PhoneDto>,
    private readonly repo: IUserRepository,
    ){}

  get name(): string {
    return this.constructor.name;
  }

  async execute(usersDto: CreateUserDto):Promise<Result<void>>{
    const users = await this.findByPhoneUserService.execute(usersDto.phone); 
    if(users.Value){
      throw new NotFoundException ("User Alredy exists");
    }
    let phoneMovistar = await this.phone.execute(usersDto.phone);
    phoneMovistar.IsSuccess
    if(!phoneMovistar.IsSuccess) return Result.fail<void>(phoneMovistar.Error);
    let phoneMovistarDto = await this.IMapperPhone.domainTo(phoneMovistar.Value);
    usersDto.phone = phoneMovistarDto.phoneNumber;
    const savedUser = await this.repo.createUser(UserFactory.userFactoryMethod(phoneMovistarDto.id, phoneMovistarDto.phoneNumber, 
      phoneMovistarDto.linePhoneId, phoneMovistarDto.lineName));
    return savedUser;
  }
}

