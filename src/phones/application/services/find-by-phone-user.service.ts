import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/users/domain/user';
import { IFindService } from 'src/common/domain/ifind.service';
import { IgenericRepo, UserRepository } from 'src/users/infrastructure/user.repository.impl';
import { PhoneEntity } from 'src/phones/infrastructure/phones.entity';

@Injectable()
export class findByPhoneUserService implements IFindService<number, User> {

  constructor(
    @Inject('IgenericRepo')
    private readonly repo:IgenericRepo<PhoneEntity,User>,
  ){}

  execute(value?: number): Promise<User> {
      const valueFormatted = value.toString().substring(3);
      console.log(valueFormatted)
      return this.repo.finderCriteria({phoneNumber: Number(valueFormatted)});
  }

}

