import { Imapper } from "src/core/application/IMapper";
import { Phone, phoneNumber } from "src/phones/domain/value-objects/phone";
import { PhoneEntity } from "../phones.entity";

export class phoneMapper implements Imapper<Phone,PhoneEntity> {
    async domainTo(domainEntity: Phone): Promise<PhoneEntity> {
        const ormEntity:PhoneEntity = PhoneEntity.create(
            domainEntity.id,
            domainEntity.phoneNumber.phoneNumber,
            domainEntity.linePhone.id
        )
        return ormEntity;
      
    }
    async ToDomain(ormEntity: PhoneEntity): Promise<Phone> {
        const phone:Phone = new Phone(
            ormEntity.id,
            phoneNumber.create(ormEntity.phoneNumber),
            ormEntity.linePhone,
        )
        return phone;
    }


}
