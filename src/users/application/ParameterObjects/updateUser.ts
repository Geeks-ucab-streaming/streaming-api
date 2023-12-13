import { Imapper } from "src/core/application/IMapper";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { User } from "src/users/domain/userAggregate/user";

export class UpdateUser {
 public id: string;
 public userToUpdate: UpdateUserDto;
 public mapper: Imapper<User, UpdateUserDto>;

 constructor(id: string, userToUpdate: UpdateUserDto, mapper: Imapper<User, UpdateUserDto>) {
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