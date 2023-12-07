import { User } from 'src/users/domain/userAggregate/user';
import { phoneOperatorsEnum } from 'src/phones/domain/phoneAggregate/value-objects/phoneOperators.enum';
import { PhoneInvalidExceptions } from 'src/phones/domain/exceptions/phone-not-valid-exception';
import { IUserRepository } from 'src/users/domain/IUserRepository';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';
import { phoneNumber } from 'src/phones/domain/phoneAggregate/phone';

export class findByPhoneUserService implements IApplicationService<number, User> {
  private readonly repo: IUserRepository;
  get name(): string {
    return this.constructor.name;
  }
  constructor(repo: IUserRepository) {
    this.repo = repo;
  }

  async execute(value?: number): Promise<Result<User>> {
    const phone = phoneNumber.create(Number(value));
    return Result.success<User>(await this.repo.finderCriteria({ phoneNumber:  phone  }));
  }
} 
