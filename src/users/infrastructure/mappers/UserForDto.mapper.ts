import { User } from "src/users/domain/userAggregate/user";
import { Imapper } from "src/core/application/IMapper";
import { userId } from "src/users/domain/userAggregate/value-objects/userId";
import { userName } from "src/users/domain/userAggregate/value-objects/userName";
import { UserBirthDate } from "src/users/domain/userAggregate/value-objects/userBirthDate";
import { userSuscriptionState } from "src/users/domain/userAggregate/entities/userSuscriptionState";
import { UserGender } from "src/users/domain/userAggregate/value-objects/userGender";
import { UserDto } from "src/users/application/dtos/user.dto";
import { PhoneAndDtoMapper } from "src/phones/infrastructure/mapper/phoneAndDto.mapper";

export class UsersForDtoMapper implements Imapper<User, UserDto> {

  private readonly mapperPhone = new PhoneAndDtoMapper();

  async domainTo(userDomainEntity: User): Promise<UserDto> {
      const userDto:UserDto = new UserDto();
      userDto.id = userDomainEntity.Id.Id;
      userDto.phone= await this.mapperPhone.domainTo(userDomainEntity.Phone);
      /*userDto.name = userDomainEntity.Name.Name;
      userDto.birth_date = userDomainEntity.BirthDate.BirthDate;
      userDto.gender= userDomainEntity.Gender.Gender;*/
      return await userDto;
  }

  async ToDomain(userDto: UserDto): Promise<User> {
    let usersDate = new Date(userDto.birth_date);
    let user: User =  User.create(
      userId.create(userDto.id),
      await this.mapperPhone.ToDomain(userDto.phone),
      userSuscriptionState.create("gratuito", new Date(Date.now())),
      null,
      userName.create(userDto.name),
      UserBirthDate.create(usersDate, usersDate.getFullYear()),
      UserGender.create(userDto.gender),
    );  

    return Promise.resolve(user);
  }

}