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
import { v4 as uuidv4 } from 'uuid';

export class SignUserUpDigitel implements IApplicationService<CreateUserDto,void>{
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
    const phone = await this.phone.execute(Phone.create(uuidv4(),usersDto.phone,uuidv4(),usersDto.phone.toString().substring(0, 3) ));
    let usuario = new User(
      userId.create(uuidv4())
    , phone.Value
    , userSuscriptionState.create(usersDto.suscriptionState)
     )

    //Crear nuevo usuario
    const savedUser = await this.repo.createUser(usuario); //Guarda la instancia en la BD.
    return savedUser;
  }
}
