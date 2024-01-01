import { User } from "src/users/domain/userAggregate/user";
import { UserEntity } from "../entities/users.entity";
import { Imapper } from "src/common/Application/IMapper";
import { userId } from "src/users/domain/userAggregate/value-objects/userId";
import { userName } from "src/users/domain/userAggregate/value-objects/userName";
import { UserBirthDate } from "src/users/domain/userAggregate/value-objects/userBirthDate";
import { userSuscriptionState } from "src/users/domain/userAggregate/value-objects/userSuscriptionState";
import { UserGender } from "src/users/domain/userAggregate/value-objects/userGender";
import { phoneMapper } from "src/phones/infrastructure/mapper/phone.mapper";
import { TokenEntity } from '../../domain/userAggregate/entities/token';
import { userEmail } from 'src/users/domain/userAggregate/value-objects/userEmail';


export class UsersMapper implements Imapper<User, UserEntity> {

  private readonly mapperPhone = new phoneMapper();

  async domainTo(domainEntity: User): Promise<UserEntity> {
      const ormEntity:UserEntity = new UserEntity();
      ormEntity.id = domainEntity.Id.Id;
      ormEntity.suscriptionState = domainEntity.SuscriptionState.SuscriptionState;
      ormEntity.phone= await this.mapperPhone.domainTo(domainEntity.Phone);
      if(domainEntity.Email){
        ormEntity.email = domainEntity.Email.Email;
      }
      
      if(domainEntity.Name){
        ormEntity.name = domainEntity.Name.Name;
      }

      if(domainEntity.BirthDate){
        ormEntity.birth_date = domainEntity.BirthDate.BirthDate;
      }

      if(domainEntity.Gender){
        ormEntity.gender= domainEntity.Gender.Gender;
      }
      return await ormEntity;
  }

  async ToDomain(ormEntity: UserEntity): Promise<User> {
    let tokenArray: TokenEntity[] = [];
    /*ormEntity.tokenDeviceUser.map((token) => {
      tokenArray.push(TokenEntity.create(token.token));
    });*/
    let user: User =  User.create(
      userId.create(ormEntity.id),
      await this.mapperPhone.ToDomain(ormEntity.phone),
      userSuscriptionState.create(ormEntity.suscriptionState, /*CAMBIAR POR LA FECHA REAL*/ormEntity.subscription_date),
      tokenArray,
    );  

    if(ormEntity.email){
      user.updateUsersEmail(userEmail.create(ormEntity.email));
    }
    
    if(ormEntity.name){
      user.updateUsersName(userName.create(ormEntity.name));
    }

    if(ormEntity.birth_date){
      let birthDate = new Date(ormEntity.birth_date);
      user.updateUsersBirthDate(UserBirthDate.create(birthDate, birthDate.getFullYear()));
    }

    if(ormEntity.gender){
      user.updateUsersGender(UserGender.create(ormEntity.gender));
    }

    return Promise.resolve(user);
  }

}