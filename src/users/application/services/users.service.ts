import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/domain/userAggregate/user';
import { IUserRepository } from 'src/users/domain/IUserRepository';
import { UserEntity } from 'src/users/infrastructure/entities/users.entity';

@Injectable()
export class UsersService {
  //InjectRepository(): Le decimos al sistema de DI que necesitamos usar el reporistorio de "User".
  //DI usa esta notación (Repository<User>) para avaeriguar cuál instancia necesita "inyectar" a esta clase en tiempo de ejecución.
  //Se usa el decorador porque Repository<User> tiene un parámetro genérico
  constructor(
    private readonly repo: IUserRepository,
  ) {}

  async create(user: User) {
    //Asigna los valores de la instancia de User a la instancia de UserEntity
    const savedUser = await this.repo.createUser(user); //Guarda la instancia en la BD.
    return savedUser;
  }

  async update(id: string, attrs: Partial<UserEntity>){
    //attrs: Partial<User> te permite colocar la cantidad de parámetros que quieras del objeto User, hacíendolo más flexible. 
    //Puedes pasar un objeto vacío, con el nombre, la fecha de nacimiento o lo que sea: va a funcionar.
    const user = await this.repo.findById(id);
    if (!user){
      throw new NotFoundException("user not found");
    }
    Object.assign(user, attrs);
    return this.repo.updateUser(user);
  }

  find(id: string) {
    //Devuelve un array de muchos registros que cumplan un criterio
    //El criterio es el número de teléfono.
    return this.repo.findById(id);
  }
}
