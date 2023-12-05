import { Imapper } from "src/core/application/IMapper";
import { Phone } from "src/phones/domain/value-objects/phone";
import { PhoneEntity } from "../phones.entity";

export class phoneMapper implements Imapper<Phone,PhoneEntity> {
    async domainToOrm(domainEntity: Phone): Promise<PhoneEntity> {
        const ormEntity:PhoneEntity = PhoneEntity.create(
            domainEntity.id,
            domainEntity.phoneNumber,
            domainEntity.linePhone.id
        )
        return ormEntity;
      
    }
    async ormToDomain(ormEntity: PhoneEntity): Promise<Phone> {
        const phone:Phone = new Phone(
            ormEntity.id,
            ormEntity.phoneNumber,
            ormEntity.linePhone,
        )
        return phone;
    }


}