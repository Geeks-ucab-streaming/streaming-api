import { IUserRepository } from "src/users/domain/IUserRepository";
import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { Result } from "src/common/domain/logic/Result";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { ParameterObjectUser } from "../ParameterObjects/updateUser";
import { userSuscriptionState } from "src/users/domain/userAggregate/value-objects/userSuscriptionState";
import { UserDto } from "../dtos/user.dto";
import { userId } from "src/users/domain/userAggregate/value-objects/userId";

export class CancelUsersSubscription implements IApplicationService<userId, void> {
constructor(private readonly repo: IUserRepository,) {}

  get name(): string {
    throw new Error("Method not implemented.");
  }

  async execute(id: userId): Promise<Result<void>>{

    const user = await this.repo.findById(id.Id);
    if (!user) 
      throw new NotFoundException('User not found');

     user.updateUsersSuscriptionState(userSuscriptionState.create("eliminado", user.SuscriptionState.suscription_date));  
     await this.repo.updateUser(user); //Guarda la instancia en la BD.

    return Result.success<void>(void 0);
  }
  
}