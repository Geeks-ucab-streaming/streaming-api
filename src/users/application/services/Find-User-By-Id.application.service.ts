import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { Result } from "src/common/domain/logic/Result";
import { IUserRepository } from "src/users/domain/IUserRepository";
import { User } from "src/users/domain/userAggregate/user";
import { ItransactionHandler } from '../../../common/domain/transaction_handler/transaction_handler';

export class FindUserById implements IApplicationService<string, User> {

    constructor(
      private readonly repo: IUserRepository,
    private readonly transactionHandler: ItransactionHandler
    ) {}
    get name(): string {
      return this.constructor.name;
    }

    async execute(id: string): Promise<Result<User>>{
      const user = await this.repo.findById(id,this.transactionHandler);
      return Result.success<User>(user);
    }
    
  }