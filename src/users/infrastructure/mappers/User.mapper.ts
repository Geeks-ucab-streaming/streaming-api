import { User } from "src/users/domain/userAggregate/user";
import { UserEntity } from "../entities/users.entity";
import { Imapper } from "src/core/application/IMapper";
import { userId } from "src/users/domain/userAggregate/value-objects/userId";
import { userName } from "src/users/domain/userAggregate/value-objects/userName";
import { UserBirthDate } from "src/users/domain/userAggregate/value-objects/userBirthDate";
import { userSuscriptionState } from "src/users/domain/userAggregate/entities/userSuscriptionState";
import { UserGender } from "src/users/domain/userAggregate/value-objects/userGender";
import { phoneMapper } from "src/phones/infrastructure/mapper/phone.mapper";
import { TokenEntity } from '../../domain/userAggregate/entities/token';

export class UsersMapper implements Imapper<User, UserEntity> {

  private readonly mapperPhone = new phoneMapper();

  async domainTo(domainEntity: User): Promise<UserEntity> {
      const ormEntity:UserEntity = new UserEntity();
      ormEntity.id = domainEntity.Id.Id;
      ormEntity.suscriptionState = domainEntity.SuscriptionState.SuscriptionState
      ormEntity.phone= await this.mapperPhone.domainTo(domainEntity.Phone);
      /*ormEntity.name = domainEntity.Name.Name;
      ormEntity.birth_date = domainEntity.BirthDate.BirthDate;
      ormEntity.gender= domainEntity.Gender.Gender;*/
      return await ormEntity;
  }

  async ToDomain(ormEntity: UserEntity): Promise<User> {
    let usersDate = new Date(ormEntity.birth_date);
    let tokenArray: TokenEntity[] = [];
    ormEntity.tokenDeviceUser.map((token) => {
      tokenArray.push(TokenEntity.create(token.token));
    });
    let user: User =  User.create(
      userId.create(ormEntity.id),
      await this.mapperPhone.ToDomain(ormEntity.phone),
      userSuscriptionState.create(ormEntity.suscriptionState, /*CAMBIAR POR LA FECHA REAL*/new Date(Date.now())),
      tokenArray,
      /*userName.create(ormEntity.name),
      UserBirthDate.create(usersDate, usersDate.getFullYear()),
      UserGender.create(ormEntity.gender),*/
    );  
    console.log(user,"el usuerio del mapper")
    return Promise.resolve(user);
  }

}