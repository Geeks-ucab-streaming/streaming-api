import { IUserRepository } from "src/users/domain/IUserRepository";
import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { Result } from "src/common/domain/logic/Result";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { ParameterObjectUser } from "../ParameterObjects/updateUser";
import { userSuscriptionState } from "src/users/domain/userAggregate/value-objects/userSuscriptionState";
import { UserDto } from "../dtos/user.dto";
import { userId } from "src/users/domain/userAggregate/value-objects/userId";
import { ItransactionHandler } from "src/common/domain/transaction_handler/transaction_handler";

export class CancelUsersSubscription implements IApplicationService<userId, void> {
constructor(private readonly repo: IUserRepository,private readonly transactionHandler:ItransactionHandler) {}

  get name(): string {
    return this.constructor.name;
  }

  async execute(id: userId): Promise<Result<void>>{

    const user = await this.repo.findById(id.Id, this.transactionHandler);
    if (!user) 
      throw new NotFoundException('User not found');

     user.updateUsersSuscriptionState(userSuscriptionState.create("eliminado", user.SuscriptionState.suscription_date));  
     await this.repo.updateUser(user, this.transactionHandler); //Guarda la instancia en la BD.

    return Result.success<void>(void 0);
  }
  
}