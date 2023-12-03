import { Inject, Injectable } from '@nestjs/common';
import { PhoneDto } from "../dtos/phone.dto";
import { IFindService } from 'src/common/domain/ifind.service';
import { Phone } from 'src/phones/domain/phone';
import { ICreateRepository } from 'src/phones/domain/generic-repo-phones';
import { PhoneEntity } from 'src/phones/infrastructure/phones.entity';
import { User } from 'src/users/domain/userAggregate/user';
import {v4 as uuidv4} from 'uuid';
import { LineEntity } from 'src/phones/infrastructure/lines.entity';
import { CreatePhoneDto } from '../dtos/create-phone.dto';


@Injectable()
export class PhonesService implements IFindService<PhoneDto,PhoneEntity> {

  //InjectRepository(): Le decimos al sistema de DI que necesitamos usar el reporistorio de "Teléfono".
  //DI usa esta notación (Repository<Phone>) para averiguar cuál instancia necesita "inyectar" a esta clase en tiempo de ejecución.
  //Se usa el decorador porque Repository<PhoneDto> tiene un parámetro genérico
  constructor( @Inject('ICreateRepository')
  private readonly repo:ICreateRepository<Phone>
  ){}
  execute(value?: CreatePhoneDto): Promise<PhoneEntity> {
    const phone = new Phone(uuidv4(),value.phoneNumber) as PhoneEntity;
    phone.linePhone = new LineEntity();
    return this.repo.create(phone) as Promise<PhoneEntity>;
  }

}

