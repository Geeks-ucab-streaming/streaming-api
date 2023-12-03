import { Inject, Injectable } from '@nestjs/common';
import { PhoneDto } from "../dtos/phone.dto";
import { IFindService } from 'src/common/domain/ifind.service';
import { Phone } from 'src/phones/domain/phone';
import { ICreateRepository, IgenericRepo } from 'src/phones/domain/generic-repo-phones';
import { PhoneEntity } from 'src/phones/infrastructure/phones.entity';
import { User } from 'src/users/domain/user';
import {v4 as uuidv4} from 'uuid';
import { LineEntity } from 'src/phones/infrastructure/lines.entity';
import { CreatePhoneDto } from '../dtos/create-phone.dto';
import { PrefixEntity } from 'src/phones/infrastructure/prefixes.entity';
import { Line } from 'src/phones/domain/line';



export class PhonesService implements IFindService<PhoneDto,Phone> {

  //InjectRepository(): Le decimos al sistema de DI que necesitamos usar el reporistorio de "Teléfono".
  //DI usa esta notación (Repository<Phone>) para averiguar cuál instancia necesita "inyectar" a esta clase en tiempo de ejecución.
  //Se usa el decorador porque Repository<PhoneDto> tiene un parámetro genérico
  constructor( 
  private readonly repo:ICreateRepository<Phone>,
  private readonly repoLines :IgenericRepo <string,PrefixEntity>
  ){}
  async execute(value: CreatePhoneDto): Promise<Phone> {

    const line = await this.repoLines.finderCriteria(value.phoneNumber.toString().substring(0, 3));
    const phone = new Phone(uuidv4(),value.phoneNumber,line.linePhone);
    return this.repo.createPhone(phone);
  }

}

