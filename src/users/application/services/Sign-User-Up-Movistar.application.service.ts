import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { CreateUserDto } from "../dtos/create-user.dto";
import { PhonesService } from "src/phones/application/services/register-users-phone.application.service";
import { Imapper } from "src/core/application/IMapper";
import { User } from "src/users/domain/userAggregate/user";
import { UserEntity } from "src/users/infrastructure/entities/users.entity";
import { NotFoundException } from "@nestjs/common";
import { Phone } from "src/phones/domain/phoneAggregate/phone";
import { userId } from "src/users/domain/userAggregate/value-objects/userId";
import { userSuscriptionState } from "src/users/domain/userAggregate/entities/userSuscriptionState";
import { IUserRepository } from "src/users/domain/IUserRepository";
import { phoneId } from "src/phones/domain/phoneAggregate/value-objects/phoneId";
import { phoneNumber } from "src/phones/domain/phoneAggregate/value-objects/phoneNumber";
import { UserFactory } from "src/users/domain/factories/user.factory";

export class SignUserUpMovistar implements IApplicationService<CreateUserDto,void>{
  constructor(private phone:PhonesService,
    private findByPhoneUserService: IApplicationService<number, User>,
    private IMapper: Imapper<User,UserEntity>,
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
    const phoneMovistar = await this.phone.execute(usersDto.phone);
    const userFactory: UserFactory = new UserFactory();
    //Guardar usuario en la b/d
    const savedUser = await this.repo.createUser(userFactory.factoryMethod(usersDto)); //Guarda la instancia en la BD.
    return savedUser;
  }
}

