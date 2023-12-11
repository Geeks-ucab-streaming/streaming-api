/*import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../infrastructure/users.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from 'src/users/domain/userAggregate/user';
import { PhoneEntity } from 'src/phones/infrastructure/phones.entity';

@Injectable()
export class UsersService {
  //InjectRepository(): Le decimos al sistema de DI que necesitamos usar el reporistorio de "User".
  //DI usa esta notación (Repository<User>) para avaeriguar cuál instancia necesita "inyectar" a esta clase en tiempo de ejecución.
  //Se usa el decorador porque Repository<User> tiene un parámetro genérico
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  async create(user: User) {
    console.log(user.id)
    //Crea una instancia de UserEntity
    const userEntity = new UserEntity();
    console.log(user.phonesNumber.id,user.phonesNumber.phoneNumber,user.phonesNumber.linePhone.id,"en create")
    //Asigna los valores de la instancia de User a la instancia de UserEntity
    userEntity.id = user.id.getValue();
    userEntity.name = user.name.getValue();
    userEntity.birth_date = user.birth_date.getBirthDate();
    userEntity.gender = user.genero.getValue(); // Change property name to 'genero'
    userEntity.suscriptionState = user.suscriptionState.getValue(); // Change property name to 'suscriptionState'
    userEntity.phone =  PhoneEntity.create(user.phonesNumber.id,user.phonesNumber.phoneNumber,user.phonesNumber.linePhone.id) 

    const savedUser = await this.repo.save(userEntity); //Guarda la instancia en la BD.
    return savedUser;
  }

  find(id: string) {
    //Devuelve un array de muchos registros que cumplan un criterio
    //El criterio es el número de teléfono.
    return this.repo.find({ where: { id } });
  }
}
*/