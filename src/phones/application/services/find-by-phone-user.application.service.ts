import { User } from 'src/users/domain/userAggregate/user';
import { IUserRepository } from 'src/users/domain/IUserRepository';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';
import { phoneNumber } from 'src/phones/domain/phoneAggregate/value-objects/phoneNumber';

export class findByPhoneUserService implements IApplicationService<string, User> {
  private readonly repo: IUserRepository;
  get name(): string {
    return this.constructor.name;
  }
  constructor(repo: IUserRepository) {
    this.repo = repo;
  }

  async execute(value?: string): Promise<Result<User>> {
    const phone = phoneNumber.create(value);
    return Result.success<User>(await this.repo.finderCriteria({ PhoneNumber:  phone  }));
  }
} 
