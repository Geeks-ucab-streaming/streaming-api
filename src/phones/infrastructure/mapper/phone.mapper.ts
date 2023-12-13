import { Imapper } from "src/core/application/IMapper";
import { Phone } from "src/phones/domain/phoneAggregate/phone";
import { PhoneEntity } from "../phones.entity";
import { phoneNumber } from "src/phones/domain/phoneAggregate/value-objects/phoneNumber";
import { phoneId } from "src/phones/domain/phoneAggregate/value-objects/phoneId";
import { Line } from "src/phones/domain/phoneAggregate/value-objects/line";

export class phoneMapper implements Imapper<Phone,PhoneEntity> {
    async domainTo(domainEntity: Phone): Promise<PhoneEntity> {
        const ormEntity:PhoneEntity = PhoneEntity.create(
            domainEntity.idPhone.Id,
            domainEntity.phoneNumber.phoneNumber,
            domainEntity.linePhone.id
        )
        return ormEntity;
      
    }
    async ToDomain(ormEntity: PhoneEntity): Promise<Phone> {
        console.log(ormEntity)
        const phone:Phone = new Phone(
            phoneId.create(ormEntity.id),
            phoneNumber.create(ormEntity.phoneNumber),
            Line.create(ormEntity.linePhone.id,ormEntity.linePhone.name)
        )
        return phone;
    }
}