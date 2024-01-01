import { Imapper } from 'src/common/Application/IMapper';
import { Phone } from 'src/phones/domain/phoneAggregate/phone';
import { PhoneEntity } from '../../infrastructure/entities/phones.entity';
import { phoneNumber } from 'src/phones/domain/phoneAggregate/value-objects/phoneNumber';
import { phoneId } from 'src/phones/domain/phoneAggregate/value-objects/phoneId';
import { Line } from 'src/phones/domain/phoneAggregate/value-objects/line';
import { LineEntity } from '../entities/lines.entity';

export class phoneMapper implements Imapper<Phone, PhoneEntity> {
  async domainTo(phoneDomainEntity: Phone): Promise<PhoneEntity> {
    const ormEntity: PhoneEntity = new PhoneEntity();
    const lineEntity: LineEntity = new LineEntity();
    (ormEntity.id = phoneDomainEntity.Id.Id),
      (ormEntity.phoneNumber = phoneDomainEntity.PhoneNumber.phoneNumber),
      (lineEntity.id = phoneDomainEntity.LinePhone.id);
    lineEntity.name = phoneDomainEntity.LinePhone.name;
    ormEntity.linePhone = lineEntity;
    return ormEntity;
  }

  async ToDomain(ormEntity: PhoneEntity): Promise<Phone> {
    const phone: Phone = new Phone(
      phoneId.create(ormEntity.id),
      phoneNumber.create(ormEntity.phoneNumber),
      Line.create(ormEntity.linePhone.id, ormEntity.linePhone.name),
    );
    return phone;
  }
}
