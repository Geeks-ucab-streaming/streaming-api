import { IUserRepository } from "src/users/domain/IUserRepository";
import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { Result } from "src/common/domain/logic/Result";
import { UserDto } from "../dtos/user.dto";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { UpdateUser } from "../ParameterObjects/updateUser";
import { userSuscriptionState } from "src/users/domain/userAggregate/value-objects/userSuscriptionState";


export class CancelUsersSubscription implements IApplicationService<UpdateUser, void> {
  constructor(
    private readonly repo: IUserRepository,
  ) {}
  get name(): string {
    throw new Error("Method not implemented.");
  }

  async execute(usuarioParametrizado: UpdateUser): Promise<Result<void>>{

    const user = await this.repo.findById(usuarioParametrizado.id);
    if (!user) 
      throw new NotFoundException('User not found');

    if (usuarioParametrizado.SuscriptionState) {
     user.updateUsersSuscriptionState(userSuscriptionState.create("cancelado", new Date(Date.now())));  
    }

    return Result.success<void>(void 0);
  }
  
}