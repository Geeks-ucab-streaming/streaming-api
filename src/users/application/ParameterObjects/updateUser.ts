import { User } from 'src/users/domain/userAggregate/user';
import { UserEntity } from 'src/users/infrastructure/entities/users.entity';
import { UserDto } from '../dtos/user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Imapper } from 'src/common/Application/IMapper';

export class UpdateUser {
  public id: string;
  public userToUpdate: UpdateUserDto;
  public mapper: Imapper<User, UserDto>;

  constructor(
    id: string,
    userToUpdate: UpdateUserDto,
    mapper: Imapper<User, UserDto>,
  ) {
    this.id = id;
    this.userToUpdate = userToUpdate;
    this.mapper = mapper;
  }

  set Id(id: string) {
    this.id = id;
  }

  set UserToUpdate(userToUpdate: UpdateUserDto) {
    this.userToUpdate = userToUpdate;
  }
}
