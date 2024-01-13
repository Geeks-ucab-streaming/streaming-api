import { IUserRepository } from "src/users/domain/IUserRepository";
import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { Result } from "src/common/domain/logic/Result";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { ParameterObjectUser } from "../ParameterObjects/updateUser";
import { userSuscriptionState } from "src/users/domain/userAggregate/value-objects/userSuscriptionState";
import { UserDto } from "../dtos/user.dto";

export class CancelUsersSubscription implements IApplicationService<ParameterObjectUser<UserDto>, void> {
constructor(
    private readonly repo: IUserRepository,
  ) {}
  get name(): string {
    throw new Error("Method not implemented.");
  }

  async execute(usuarioParametrizado: ParameterObjectUser<UserDto>): Promise<Result<void>>{

    const user = await this.repo.findById(usuarioParametrizado.id);
    if (!user) 
      throw new NotFoundException('User not found');

    if (usuarioParametrizado.SuscriptionState) {
     user.updateUsersSuscriptionState(userSuscriptionState.create("cancelado", user.SuscriptionState.suscription_date));  
    }

    return Result.success<void>(void 0);
  }
  
}