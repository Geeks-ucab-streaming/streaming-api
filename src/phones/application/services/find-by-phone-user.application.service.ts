import { User } from 'src/users/domain/userAggregate/user';
import { IUserRepository } from 'src/users/domain/IUserRepository';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';
import { phoneNumber } from 'src/phones/domain/phoneAggregate/value-objects/phoneNumber';
import { ItransactionHandler } from '../../../common/domain/transaction_handler/transaction_handler';

export class findByPhoneUserService
  implements IApplicationService<string, User>
{
  private readonly repo: IUserRepository;
  private readonly transactionHandler: ItransactionHandler;
  get name(): string {
    return this.constructor.name;
  }
  constructor(repo: IUserRepository, transactionHandler: ItransactionHandler) {
    this.transactionHandler = transactionHandler;
    this.repo = repo;
  }

  async execute(value?: string): Promise<Result<User>> {
    const phone = phoneNumber.create(value);
    return Result.success<User>(
      await this.repo.finderCriteria(
        { PhoneNumber: phone },
        this.transactionHandler,
      ),
    );
  }
}
