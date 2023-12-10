import { User } from "src/users/domain/userAggregate/user";
import { UserEntity } from "../users.entity";
import { Imapper } from "src/core/application/IMapper";
import { userId } from "src/users/domain/userAggregate/value-objects/userId";
import { userName } from "src/users/domain/userAggregate/value-objects/userName";
import { UserBirthDate } from "src/users/domain/userAggregate/value-objects/userBirthDate";
import { userSuscriptionState } from "src/users/domain/userAggregate/entities/userSuscriptionState";
import { UserGender } from "src/users/domain/userAggregate/value-objects/userGender";
import { phoneMapper } from "src/phones/infrastructure/mapper/phone.mapper";

export class UsersMapper implements Imapper<User, UserEntity> {

  private readonly mapperPhone = new phoneMapper();

  async domainTo(domainEntity: User): Promise<UserEntity> {
      const ormEntity:UserEntity = new UserEntity();
      ormEntity.id = domainEntity.id.getId();
      ormEntity.name = domainEntity.name.getValue();
      ormEntity.birth_date = domainEntity.birth_date.getBirthDate();
      ormEntity.gender= domainEntity.gender.getGender();
      ormEntity.suscriptionState = domainEntity.suscriptionState.getSuscriptionState();
      ormEntity.phone= await this.mapperPhone.domainTo(domainEntity.phone);
      return await ormEntity;
  }

  async ToDomain(ormEntity: UserEntity): Promise<User> {
    let usersDate = new Date(ormEntity.birth_date);
    let user: User =  User.create(
      userId.create(ormEntity.id),
      userName.create(ormEntity.name),
      UserBirthDate.create(usersDate, usersDate.getFullYear()),
      UserGender.create(ormEntity.gender),
      userSuscriptionState.create(ormEntity.suscriptionState),
      await this.mapperPhone.ToDomain(ormEntity.phone)
    );

    return Promise.resolve(user);
  }

}