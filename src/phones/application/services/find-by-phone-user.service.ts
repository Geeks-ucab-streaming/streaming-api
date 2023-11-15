import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { User } from 'src/users/domain/user';

import { IFindService } from 'src/common/domain/ifind.service';
import { PhoneEntity } from 'src/phones/infrastructure/phones.entity';
import { IgenericRepo } from 'src/phones/domain/generic-repo-phones';
import { phoneOperatorsEnum } from 'src/users/domain/value-objects/phoneOperators.enum';

@Injectable()
export class findByPhoneUserService implements IFindService<number, User> {

  //InjectRepository(): Le decimos al sistema de DI que necesitamos usar el reporistorio de "User".
  //DI usa esta notación (Repository<User>) para avaeriguar cuál instancia necesita "inyectar" a esta clase en tiempo de ejecución.
  //Se usa el decorador porque Repository<User> tiene un parámetro genérico
  constructor(
    @Inject('IgenericRepo')
    private readonly repo:IgenericRepo<PhoneEntity,User>,
  ){} 

  execute(value?: number): Promise<User> {
      if (!Object.values(phoneOperatorsEnum).includes(value.toString().substring(0,3) as phoneOperatorsEnum)) throw new BadRequestException('Invalid phone operator');
      return this.repo.finderCriteria({phoneNumber: Number(value)});
  }

}
