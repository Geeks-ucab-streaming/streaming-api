import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "src/users/domain/userAggregate/user";
import { NotFoundException } from "@nestjs/common";
import { Phone } from "src/phones/domain/phoneAggregate/phone";
import { IUserRepository } from "src/users/domain/IUserRepository";
import { UserFactory } from "src/users/domain/factories/user.factory";
import { Result } from '../../../common/domain/logic/Result';
import { DomainException } from '../../../common/domain/exceptions/domain-exception';
import { ITokenUserRepository } from '../../domain/tokenUser.repository';
import { TokenEntity } from '../../domain/userAggregate/entities/token';
import { ItransactionHandler } from '../../../common/domain/transaction_handler/transaction_handler';

export class SignUserUpDigitel implements IApplicationService<CreateUserDto,User>{
  constructor(
    private phone: IApplicationService<string, Phone>,
    private findByPhoneUserService: IApplicationService<string, User>,
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

    let phoneDigitel = await this.phone.execute(usersDto.phone);void 0

    if(!phoneDigitel.IsSuccess) {
      await this.transactionHandler.rollbackTransaction()
      return Result.fail<User>(new DomainException<string>(void 0,phoneDigitel.message,phoneDigitel.error,phoneDigitel.statusCode));
    }

    if(!phoneDigitel.Value.validatePrefixDigitel()){
      await this.transactionHandler.rollbackTransaction()
      return Result.fail<User>(new DomainException<string>(void 0,'Phone prefix is not from Digitel','DomainException',404));
    }

    const savedUser = await this.repo.createUser(UserFactory.userFactoryMethod(phoneDigitel.Value.Id.Id, phoneDigitel.Value.PhoneNumber.phoneNumber,
      phoneDigitel.Value.LinePhone.id, phoneDigitel.Value.LinePhone.name, usersDto.token),this.transactionHandler);
    const tokenEntity = TokenEntity.create(usersDto.token,savedUser.value.Id.Id);
    await this.tokenRepository.saveToken(tokenEntity,this.transactionHandler)
    await this.transactionHandler.commitTransaction()
    return savedUser;
  }
}


