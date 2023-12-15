import { Repository } from 'typeorm';
import { User } from '../../domain/userAggregate/user';
import { UserEntity } from '../entities/users.entity';
import { Phone } from 'src/phones/domain/phoneAggregate/phone';
import { IUserRepository } from '../../domain/IUserRepository';
import { DataSourceSingleton } from 'src/core/infrastructure/dataSourceSingleton';
import { Imapper } from 'src/core/application/IMapper';
import { Result } from 'src/common/domain/logic/Result';

export class OrmUserRepository
extends Repository<UserEntity>
  implements IUserRepository
{

  userMapper: Imapper<User,UserEntity>

  constructor(userMapper:Imapper<User,UserEntity>) {
    super(UserEntity, DataSourceSingleton.getInstance().manager)
    this.userMapper = userMapper;
  }

  async createUser(user: User): Promise<Result<void>> {  
  const createdUser = await this.userMapper.domainTo(user);
    await this.save(createdUser);
    return Result.success<void>(void 0);
  }

  async updateUser(user: User): Promise<UserEntity> {  
    const updatedUser = await this.userMapper.domainTo(user);
    console.log(updatedUser,"el usuario actualizado")
    return await this.save(updatedUser);
    }

  async findById(userId: string): Promise<User> {
    const user = await this.findOne({ where: { id: userId},relations:['phone','phone.linePhone']});
    return this.userMapper.ToDomain(user);
  } 

  async findAll(): Promise<User[]> {
    // return await this.find();
    return;
  }

  async finderCriteria(criteria: Partial<Phone>): Promise<User | undefined> {
    const user = await this.createQueryBuilder('user')
      .innerJoinAndSelect('user.phone', 'phone')
      .where('phone.phoneNumber = :phoneNumber', {
        phoneNumber: criteria.phoneNumber.phoneNumber,
      })
      .getOne();
    //! HAY QUE IMPLEMENTAR LOS MAPPERS PARA PASAR DE ENTITY A CLASE DE DOMINIO
    //RECORDAR QUE SE DEBE TRASLADAR DE ALGUNA MANERA EL RESULTADO DE LA CONSULTA A LA ENTIDAD USER Y PHONENUMBER COMO VO

    // return user;
    return;
  }
}