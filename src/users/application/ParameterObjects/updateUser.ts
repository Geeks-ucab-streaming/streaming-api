import { UpdateUserDto } from "../dtos/update-user.dto";

export class UpdateUser {
 public id: string;
 public userToUpdate: UpdateUserDto;

 constructor(id: string, userToUpdate: UpdateUserDto) {
  this.id = id;
  this.userToUpdate = userToUpdate;
 }

 set Id(id: string) {
  this.id = id;
 }

 set UserToUpdate(userToUpdate: UpdateUserDto) {
  this.userToUpdate = userToUpdate;
 }

}