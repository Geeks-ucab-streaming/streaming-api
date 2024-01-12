import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { CreateUserDto } from "../dtos/create-user.dto";
import { PhonesService } from "src/phones/application/services/register-users-phone.application.service";
import { User } from "src/users/domain/userAggregate/user";
import { NotFoundException } from "@nestjs/common";
import { IUserRepository } from "src/users/domain/IUserRepository";
import { UserFactory } from "src/users/domain/factories/user.factory";
import { Result } from '../../../common/domain/logic/Result';
import { DomainException } from '../../../common/domain/exceptions/domain-exception';
import { ITokenUserRepository } from '../../domain/tokenUser.repository';
import { TokenEntity } from '../../domain/userAggregate/entities/token';

export class SignUserUpMovistar implements IApplicationService<CreateUserDto,User>{
  constructor(private phone:PhonesService,
    private findByPhoneUserService: IApplicationService<string, User>,
    private readonly tokenRepository: ITokenUserRepository,
    private readonly repo: IUserRepository,
    ){}

  get name(): string {
    return this.constructor.name;
  }

  async execute(usersDto: CreateUserDto):Promise<Result<User>>{

    const users = await this.findByPhoneUserService.execute(usersDto.phone); 
    if(users.Value){
      throw new NotFoundException ("User Alredy exists");
    }

    let phoneMovistar = await this.phone.execute(usersDto.phone);
    if(!phoneMovistar.IsSuccess) return Result.fail<User>(new DomainException<string>(void 0,phoneMovistar.message,phoneMovistar.error,phoneMovistar.statusCode));

    if(!phoneMovistar.Value.validatePrefixMovistar()){
      return Result.fail<User>(new Error("Phone prefix is not from Movistar"));
    }

    if(!phoneMovistar.IsSuccess) 
    return Result.fail<User>(new DomainException<string>(void 0,phoneMovistar.message,phoneMovistar.error,phoneMovistar.statusCode));

    const savedUser = await this.repo.createUser(UserFactory.userFactoryMethod(phoneMovistar.Value.Id.Id, phoneMovistar.Value.PhoneNumber.phoneNumber,
      phoneMovistar.Value.LinePhone.id, phoneMovistar.Value.LinePhone.name, usersDto.token, "premium"));
    const tokenEntity = TokenEntity.create(usersDto.token,savedUser.value.Id.Id);
    await this.tokenRepository.saveToken(tokenEntity)
    return savedUser;
  }
}

