import { DataSource, Repository } from 'typeorm';
import { User } from '../domain/userAggregate/user';
import { UserEntity } from './users.entity';
import { Phone } from 'src/phones/domain/value-objects/phone';
import { IUserRepository } from '../domain/IUserRepository';
import { DataSourceSingleton } from 'src/core/infrastructure/dataSourceSingleton';

export class OrmUserRepository
  extends Repository<UserEntity>
  implements IUserRepository
{
  constructor() {
    super(UserEntity, DataSourceSingleton.getInstance().manager);
  }
  findById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<User[]> {
    // return await this.find();
    return;
  }

  async finderCriteria(criteria: Partial<Phone>): Promise<User | undefined> {
    const user = await this.createQueryBuilder('user')
      .innerJoinAndSelect('user.phone', 'phone')
      .where('phone.phoneNumber = :phoneNumber', {
        phoneNumber: criteria.phoneNumber,
      })
      .getOne();
    //! HAY QUE IMPLEMENTAR LOS MAPPERS PARA PASAR DE ENTITY A CLASE DE DOMINIO
    //RECORDAR QUE SE DEBE TRASLADAR DE ALGUNA MANERA EL RESULTADO DE LA CONSULTA A LA ENTIDAD USER Y PHONENUMBER COMO VO

    // return user;
    return;
  }
}
