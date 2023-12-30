import { Imapper } from 'src/common/Application/IMapper';
import { Phone } from 'src/phones/domain/phoneAggregate/phone';
import { phoneNumber } from 'src/phones/domain/phoneAggregate/value-objects/phoneNumber';
import { phoneId } from 'src/phones/domain/phoneAggregate/value-objects/phoneId';
import { Line } from 'src/phones/domain/phoneAggregate/value-objects/line';
import { PhoneDto } from 'src/phones/application/dtos/phone.dto';

export class PhoneAndDtoMapper implements Imapper<Phone, PhoneDto> {
  async domainTo(phoneDomainEntity: Phone): Promise<PhoneDto> {
    console.log(phoneDomainEntity, 'AYUDACON LA ENTITY');
    const phoneDto = new PhoneDto();
    phoneDto.id = phoneDomainEntity.Id.Id;
    phoneDto.phoneNumber = phoneDomainEntity.PhoneNumber.phoneNumber;
    phoneDto.linePhoneId = phoneDomainEntity.LinePhone.id;
    phoneDto.lineName = phoneDomainEntity.LinePhone.name;
    return phoneDto;
  }

  async ToDomain(phoneDto: PhoneDto): Promise<Phone> {
    const phone: Phone = new Phone(
      phoneId.create(phoneDto.id),
      phoneNumber.create(phoneDto.phoneNumber),
      Line.create(phoneDto.linePhoneId, phoneDto.lineName),
    );
    return phone;
  }
}
