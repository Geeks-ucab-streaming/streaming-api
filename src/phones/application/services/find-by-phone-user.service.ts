import { User } from 'src/users/domain/userAggregate/user';
import { phoneOperatorsEnum } from 'src/phones/domain/value-objects/phoneOperators.enum';
import { PhoneInvalidExceptions } from 'src/phones/domain/exceptions/phone-not-valid-exception';
import { IUserRepository } from 'src/users/domain/IUserRepository';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';
import { phoneNumber } from 'src/phones/domain/value-objects/phone';

export class findByPhoneUserService implements IApplicationService<number, User> {
  private readonly repo: IUserRepository;
  get name(): string {
    return this.constructor.name;
  }
  constructor(repo: IUserRepository) {
    this.repo = repo;
  }

  async execute(value?: number): Promise<Result<User>> {
    
    return Result.success<User>(await this.repo.finderCriteria({ phoneNumber: phoneNumber.create(Number(value)) }));
  }
} 
