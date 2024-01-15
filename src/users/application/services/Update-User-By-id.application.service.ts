import { IUserRepository } from "src/users/domain/IUserRepository";
import { User } from "src/users/domain/userAggregate/user";
import { userName } from "src/users/domain/userAggregate/value-objects/userName";
import { UserBirthDate } from "src/users/domain/userAggregate/value-objects/userBirthDate";
import { UserGender } from "src/users/domain/userAggregate/value-objects/userGender";
import { userSuscriptionState } from "src/users/domain/userAggregate/value-objects/userSuscriptionState";
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { Result } from "src/common/domain/logic/Result";
import { ParameterObjectUser } from "../ParameterObjects/updateUser";
import { userEmail } from "src/users/domain/userAggregate/value-objects/userEmail";
import { DomainException } from '../../../common/domain/exceptions/domain-exception';
import { ItransactionHandler } from '../../../common/domain/transaction_handler/transaction_handler';
import { IUpdateUserDto } from "src/common/Application/dtoPorts/updateUserDtoPort";
import { IUserDto } from "src/common/Application/dtoPorts/userDtoPort";

export class UpdateUserById implements IApplicationService<ParameterObjectUser<IUpdateUserDto>, IUserDto> {
  constructor(
    private readonly repo: IUserRepository,
    private readonly transactionHandler:ItransactionHandler
  ) {}
  get name(): string {
    return 'UpdateUserById';
  }

  async execute(usuarioParametrizado: ParameterObjectUser<IUpdateUserDto>): Promise<Result<IUserDto>>{
    await this.transactionHandler.startTransaction()
    const user = await this.repo.findById(usuarioParametrizado.id, this.transactionHandler);
    
    if (!user){
      return Result.fail<IUserDto>(new NotFoundException('user not found'))
    }

    const userUpdated = User.create(
      user.Id,
      user.Phone,
      userSuscriptionState.create(user.SuscriptionState.SuscriptionState, user.SuscriptionState.suscription_date),
      null,
      )

      if (usuarioParametrizado.userToHandle.name) {
        userUpdated.updateUsersName(userName.create(usuarioParametrizado.userToHandle.name));
      }
  
      if (usuarioParametrizado.userToHandle.email) {
        userUpdated.updateUsersEmail(userEmail.create(usuarioParametrizado.userToHandle.email));
      }
  
      if (usuarioParametrizado.userToHandle.gender) {
        userUpdated.updateUsersGender(UserGender.create(usuarioParametrizado.userToHandle.gender));
      }

      if (usuarioParametrizado.userToHandle.birth_date) {
        let birthDate = new Date(usuarioParametrizado.userToHandle.birth_date);
        if(User.validateRangeBirthDate(UserBirthDate.create(birthDate, birthDate.getFullYear()), birthDate.getFullYear())){
          userUpdated.updateUsersBirthDate(UserBirthDate.create(birthDate, birthDate.getFullYear()));
        }else{
          await this.transactionHandler.rollbackTransaction()
          return Result.fail<IUserDto>(new DomainException<IUserDto>(void 0,'Invalid Birth Date','BirthDateError',400));
        }
      }

    await this.repo.updateUser(userUpdated,this.transactionHandler); //Guarda la instancia en la BD.
    await this.transactionHandler.commitTransaction()
    return Result.success<IUserDto>(await usuarioParametrizado.mapper.domainTo(userUpdated));
  }
  
}