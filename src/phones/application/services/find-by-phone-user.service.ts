import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { User } from 'src/users/domain/userAggregate/user';
import { IFindService } from 'src/common/domain/ifind.service';
import { PhoneEntity } from 'src/phones/infrastructure/phones.entity';
import { IgenericRepo } from 'src/phones/domain/generic-repo-phones';
import { phoneOperatorsEnum } from 'src/phones/domain/value-objects/phoneOperators.enum';
import { PhoneInvalidExceptions } from 'src/phones/domain/exceptions/phone-not-valid-exception';
import { IUserRepository } from 'src/users/domain/IUserRepository';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';

export class findByPhoneUserService implements IApplicationService<number, User> {
  private readonly repo: IUserRepository;
  name: string = 'findByPhoneUserService';
  constructor(repo: IUserRepository) {
    this.repo = repo;
  }

  async execute(value?: number): Promise<Result<User>> {
    if (
      !Object.values(phoneOperatorsEnum).includes(
        value.toString().substring(0, 3) as phoneOperatorsEnum,
      )
    )
      throw new PhoneInvalidExceptions();
    return Result.success<User>(await this.repo.finderCriteria({ phoneNumber: Number(value) }));
  }
} 
