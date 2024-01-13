import { IUserRepository } from "src/users/domain/IUserRepository";
import { User } from "src/users/domain/userAggregate/user";
import { userName } from "src/users/domain/userAggregate/value-objects/userName";
import { UserBirthDate } from "src/users/domain/userAggregate/value-objects/userBirthDate";
import { UserGender } from "src/users/domain/userAggregate/value-objects/userGender";
import { userSuscriptionState } from "src/users/domain/userAggregate/value-objects/userSuscriptionState";
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { Result } from "src/common/domain/logic/Result";
import { UpdateUser } from "../ParameterObjects/updateUser";
import { userEmail } from "src/users/domain/userAggregate/value-objects/userEmail";
import { UserDto } from "../dtos/user.dto";
import { DomainException } from '../../../common/domain/exceptions/domain-exception';
import { ItransactionHandler } from '../../../common/domain/transaction_handler/transaction_handler';

export class UpdateUserById implements IApplicationService<UpdateUser, UserDto> {
  constructor(
    private readonly repo: IUserRepository,
    private readonly transactionHandler:ItransactionHandler
  ) {}
  get name(): string {
    throw new Error("Method not implemented.");
  }

  async execute(usuarioParametrizado: UpdateUser): Promise<Result<UserDto>>{
    await this.transactionHandler.startTransaction()
    const user = await this.repo.findById(usuarioParametrizado.id);
    
    if (!user){
      return Result.fail<UserDto>(new NotFoundException('user not found'))
    }

    const userUpdated = User.create(
      user.Id,
      user.Phone,
      userSuscriptionState.create("premium", /*CAMBIAR POR LO REAL*/new Date(Date.now())),
      user.Token,
      )

      if (usuarioParametrizado.userToUpdate.name) {
        userUpdated.updateUsersName(userName.create(usuarioParametrizado.userToUpdate.name));
      }
  
      if (usuarioParametrizado.userToUpdate.email) {
        userUpdated.updateUsersEmail(userEmail.create(usuarioParametrizado.userToUpdate.email));
      }
  
      if (usuarioParametrizado.userToUpdate.gender) {
        userUpdated.updateUsersGender(UserGender.create(usuarioParametrizado.userToUpdate.gender));
      }

      if (usuarioParametrizado.userToUpdate.birth_date) {
        let birthDate = new Date(usuarioParametrizado.userToUpdate.birth_date);
        if(User.validateRangeBirthDate(UserBirthDate.create(birthDate, birthDate.getFullYear()), birthDate.getFullYear())){
          userUpdated.updateUsersBirthDate(UserBirthDate.create(birthDate, birthDate.getFullYear()));
        }else{
          await this.transactionHandler.rollbackTransaction()
          return Result.fail<UserDto>(new DomainException<UserDto>(void 0,'Invalid Birth Date','BirthDateError',400));
        }
      }

    await this.repo.updateUser(userUpdated,this.transactionHandler); //Guarda la instancia en la BD.
    await this.transactionHandler.commitTransaction()
    return Result.success<UserDto>(await usuarioParametrizado.mapper.domainTo(userUpdated));
  }
  
}