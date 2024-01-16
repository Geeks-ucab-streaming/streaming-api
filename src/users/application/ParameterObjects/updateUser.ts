import { User } from 'src/users/domain/userAggregate/user';
import { IUserDto } from 'src/common/Application/dtoPorts/userDtoPort';
import { Imapper } from 'src/common/Application/IMapper';

export class ParameterObjectUser<T> {
  public id: string;
  public suscriptionState: string;
  public userToHandle: T;
  public mapper: Imapper<User, IUserDto>;

  constructor(
    id: string,
    userToHandle: T,
    mapper: Imapper<User, IUserDto>,
  ) {
    this.id = id;
    this.userToHandle = userToHandle;
    this.mapper = mapper;
  }

  set Id(id: string) {
    this.id = id;
  }

  set SuscriptionState(suscriptionState: string) {
    this.suscriptionState = suscriptionState;
  }

  set UserToUpdate(userToHandle: T) {
    this.userToHandle = userToHandle;
  }
}
