import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { Result } from "src/common/domain/logic/Result";
import { IUserRepository } from "src/users/domain/IUserRepository";
import { User } from "src/users/domain/userAggregate/user";

export class FindUserById implements IApplicationService<string, User> {

    constructor(private readonly repo: IUserRepository) {}
    get name(): string {
      throw new Error("Method not implemented.");
    }

    async execute(id: string): Promise<Result<User>>{
      const user = await this.repo.findById(id);
      return Result.success<User>(user);
    }
    
  }