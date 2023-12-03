import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneEntity } from '../phones.entity';
import { ICreateRepository } from 'src/phones/domain/generic-repo-phones';
import { Phone } from '../../domain/phone';

export class OrmPhoneRepository extends Repository<PhoneEntity> implements ICreateRepository<Phone> {
  
  constructor(
    dataSource: DataSource
  ) {
    super(PhoneEntity, dataSource.manager);
  }
  findById(id: string): Promise<Phone> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Phone[]> {
    return null
   // return this.find();
  }
  createPhone(phone: Phone): Promise<Phone> {
    //SE SUPONE QUE SE DEBE HACER UN MAPPER DE PHONE A PHONEENTITY
    console.log(phone)
    return this.save(phone);
  }
}
