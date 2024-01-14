import { User } from 'src/users/domain/userAggregate/user';
import { Imapper } from 'src/common/Application/IMapper';
import { userId } from 'src/users/domain/userAggregate/value-objects/userId';
import { userName } from 'src/users/domain/userAggregate/value-objects/userName';
import { UserBirthDate } from 'src/users/domain/userAggregate/value-objects/userBirthDate';
import { userSuscriptionState } from 'src/users/domain/userAggregate/value-objects/userSuscriptionState';
import { UserGender } from 'src/users/domain/userAggregate/value-objects/userGender';
import { UserDto } from 'src/users/infrastructure/dtos/user.dto';
import { PhoneAndDtoMapper } from 'src/phones/infrastructure/mapper/phoneAndDto.mapper';
import { userEmail } from 'src/users/domain/userAggregate/value-objects/userEmail';

export class UsersForDtoMapper implements Imapper<User, UserDto> {
  private readonly mapperPhone = new PhoneAndDtoMapper();

  async domainTo(domainEntity: User): Promise<UserDto> {
    const userDto: UserDto = new UserDto();
    userDto.id = domainEntity.Id.Id;
    userDto.phone = await this.mapperPhone.domainTo(domainEntity.Phone);
    if (domainEntity.Email) {
      userDto.email = domainEntity.Email.Email;
    }

    if (domainEntity.Name) {
      userDto.name = domainEntity.Name.Name;
    }

    if (domainEntity.BirthDate) {
      userDto.birth_date = domainEntity.BirthDate.BirthDate;
    }

    if (domainEntity.Gender) {
      userDto.gender = domainEntity.Gender.Gender;
    }

    return userDto;
  }

  async ToDomain(userDto: UserDto): Promise<User> {
    let usersDate = new Date(userDto.birth_date);
    let user: User = User.create(
      userId.create(userDto.id),
      await this.mapperPhone.ToDomain(userDto.phone),
      userSuscriptionState.create(
        'premium',
        /*CAMBIAR POR LO REAL*/ new Date(Date.now()),
      ),
      null,
      userEmail.create(userDto.email),
      userName.create(userDto.name),
      UserBirthDate.create(usersDate, usersDate.getFullYear()),
      UserGender.create(userDto.gender),
    );

    return Promise.resolve(user);
  }
}
