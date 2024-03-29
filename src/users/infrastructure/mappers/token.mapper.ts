import { User } from "src/users/domain/userAggregate/user";
import { UserEntity } from "../entities/users.entity";
import { Imapper } from "src/common/Application/IMapper";
import { userId } from "src/users/domain/userAggregate/value-objects/userId";
import { userName } from "src/users/domain/userAggregate/value-objects/userName";
import { UserBirthDate } from "src/users/domain/userAggregate/value-objects/userBirthDate";
import { userSuscriptionState } from "src/users/domain/userAggregate/value-objects/userSuscriptionState";
import { UserGender } from "src/users/domain/userAggregate/value-objects/userGender";
import { phoneMapper } from "src/phones/infrastructure/mapper/phone.mapper";
import { Token } from '../../domain/userAggregate/value-objects/token';
import { userEmail } from 'src/users/domain/userAggregate/value-objects/userEmail';
import { TokenDeviceUserEntity } from '../entities/tokenDeviceUser.entity';


export class TokenMapper implements Imapper<Token, TokenDeviceUserEntity> {

  async domainTo(domainEntity: Token): Promise<TokenDeviceUserEntity> {
    const ormEntity:TokenDeviceUserEntity = new TokenDeviceUserEntity();
    const userEntity:UserEntity = new UserEntity();
    userEntity.id = domainEntity.userId;

    ormEntity.token = domainEntity.token;
    ormEntity.user = userEntity;

    return ormEntity;
  }

  async ToDomain(ormEntity: TokenDeviceUserEntity): Promise<Token> {

    return null
  }
}