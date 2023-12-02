import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { User } from 'src/users/domain/user';
import { IFindService } from 'src/common/domain/ifind.service';
import { PhoneEntity } from 'src/phones/infrastructure/phones.entity';
import { IgenericRepo } from 'src/phones/domain/generic-repo-phones';
import { phoneOperatorsEnum } from 'src/phones/domain/value-objects/phoneOperators.enum';
import { PhoneInvalidExceptions } from 'src/phones/domain/exceptions/phone-not-valid-exception';

@Injectable()
export class findByPhoneUserService implements IFindService<number, User> {

  constructor(
    @Inject('IgenericRepo')
    private readonly repo:IgenericRepo<PhoneEntity,User>,
  ){} 

  execute(value?: number): Promise<User> {
      if (!Object.values(phoneOperatorsEnum).includes(value.toString().substring(0,3) as phoneOperatorsEnum)) throw new PhoneInvalidExceptions();
      return null
 //     return this.repo.finderCriteria({phoneNumber: Number(value)});
  }

}

