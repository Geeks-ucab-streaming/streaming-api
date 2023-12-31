import { IUserRepository } from "src/users/domain/IUserRepository";
import { User } from "src/users/domain/userAggregate/user";
import { userName } from "src/users/domain/userAggregate/value-objects/userName";
import { UserBirthDate } from "src/users/domain/userAggregate/value-objects/userBirthDate";
import { UserGender } from "src/users/domain/userAggregate/value-objects/userGender";
import { userSuscriptionState } from "src/users/domain/userAggregate/value-objects/userSuscriptionState";
import { NotFoundException } from "@nestjs/common";
import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { Result } from "src/common/domain/logic/Result";
import { UpdateUser } from "../ParameterObjects/updateUser";
import { userEmail } from "src/users/domain/userAggregate/value-objects/userEmail";
import { UserDto } from "../dtos/user.dto";

export class UpdateUserById implements IApplicationService<UpdateUser, UserDto> {
  constructor(
    private readonly repo: IUserRepository,
  ) {}
  get name(): string {
    throw new Error("Method not implemented.");
  }

  async execute(usuarioParametrizado: UpdateUser): Promise<Result<UserDto>>{
    const user = await this.repo.findById(usuarioParametrizado.id);
    
    if (!user) return Result.fail<UserDto>(new NotFoundException('user not found'))

    const userUpdated = User.create(
      user.Id,
      user.Phone,
      userSuscriptionState.create("premium", /*CAMBIAR POR LO REAL*/new Date(Date.now())),
      null,
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
        userUpdated.updateUsersBirthDate(UserBirthDate.create(birthDate, birthDate.getFullYear()));
      }

    await this.repo.updateUser(userUpdated); //Guarda la instancia en la BD.
    return Result.success<UserDto>(await usuarioParametrizado.mapper.domainTo(userUpdated));
  }
  
}