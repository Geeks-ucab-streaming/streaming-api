import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { User } from 'src/users/domain/userAggregate/user';
import { IFindService } from 'src/common/domain/ifind.service';
import { PhoneEntity } from 'src/phones/infrastructure/phones.entity';
import { IgenericRepo } from 'src/phones/domain/generic-repo-phones';
import { phoneOperatorsEnum } from 'src/phones/domain/value-objects/phoneOperators.enum';
import { PhoneInvalidExceptions } from 'src/phones/domain/exceptions/phone-not-valid-exception';
import { IUserRepository } from 'src/users/domain/IUserRepository';

export class findByPhoneUserService implements IFindService<number, User> {
  private readonly repo: IUserRepository;
  constructor(repo: IUserRepository) {
    this.repo = repo;
  }

  execute(value?: number): Promise<User> {
    if (
      !Object.values(phoneOperatorsEnum).includes(
        value.toString().substring(0, 3) as phoneOperatorsEnum,
      )
    )
      throw new PhoneInvalidExceptions();
    return this.repo.finderCriteria({ phoneNumber: Number(value) });
  }
} 
