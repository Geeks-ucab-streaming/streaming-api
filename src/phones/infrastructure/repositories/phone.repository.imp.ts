import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneEntity } from '../phones.entity';
import { ICreateRepository } from 'src/phones/domain/generic-repo-phones';
import { Phone } from '../../domain/value-objects/phone';
import { Imapper } from 'src/core/application/IMapper';

export class OrmPhoneRepository extends Repository<PhoneEntity> implements ICreateRepository<Phone> {
  phoneMapper: Imapper<Phone, PhoneEntity>;
  
  constructor(
    dataSource: DataSource, phoneMapper:Imapper<Phone,PhoneEntity>
  ) {
    super(PhoneEntity, dataSource.manager);
    this.phoneMapper = phoneMapper;
  }
  async createPhone(phone: Phone): Promise<Phone> {
    const phoneToOrm = await this.phoneMapper.domainTo(phone);
    const phoneCreated = await this.phoneMapper.ToDomain(await this.save(phoneToOrm));
    return phoneCreated;
  }
}
