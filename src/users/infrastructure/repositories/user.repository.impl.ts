import { Not, Repository } from 'typeorm';
import { User } from '../../domain/userAggregate/user';
import { UserEntity } from '../entities/users.entity';
import { Phone } from 'src/phones/domain/phoneAggregate/phone';
import { IUserRepository } from '../../domain/IUserRepository';
import { DataSourceSingleton } from 'src/common/infrastructure/dataSourceSingleton';
import { Imapper } from 'src/common/Application/IMapper';
import { Result } from 'src/common/domain/logic/Result';

export class OrmUserRepository
  extends Repository<UserEntity>
  implements IUserRepository
{
  userMapper: Imapper<User, UserEntity>;

  constructor(userMapper: Imapper<User, UserEntity>) {
    super(UserEntity, DataSourceSingleton.getInstance().manager);
    this.userMapper = userMapper;
  }

  async createUser(user: User): Promise<Result<User>> {
    const createdUser = await this.userMapper.domainTo(user);
    await this.save(createdUser);
    return Result.success<User>(user);
  }

  async updateUser(user: User): Promise<Result<void>> {
    const updatedUser = await this.userMapper.domainTo(user);
    await this.save(updatedUser);
    return Result.success<void>(void 0);
  }

  async findById(userId: string): Promise<User> {
    const user = await this.findOne({
      where: { id: userId },
      relations: ['phone', 'phone.linePhone'],
    });
    return this.userMapper.ToDomain(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.createQueryBuilder('user')
      .innerJoinAndSelect('user.phone', 'phone')
      .innerJoinAndSelect('phone.linePhone', 'linePhone')
      .leftJoinAndSelect('user.tokenDeviceUser', 'tokenDeviceUser')
      .where('user.phone IS NOT NULL')
      .getMany();
    const filteredUsers = users.filter(
      (user) => user.phone != null && user.tokenDeviceUser.length > 0,
    );

    const usersDomain = await Promise.all(
      filteredUsers.map(async (user: UserEntity) => {
        if (user.phone != null && user.tokenDeviceUser.length > 0) {
          return await this.userMapper.ToDomain(user);
        }
      }),
    );
    console.log(usersDomain, 'los usuarios');
    return usersDomain;
  }

  async finderCriteria(criteria: Partial<Phone>): Promise<User | undefined> {
    const user = await this.createQueryBuilder('user')
      .innerJoinAndSelect('user.phone', 'phone')
      .innerJoinAndSelect('phone.linePhone', 'linePhone')
      .leftJoinAndSelect('user.tokenDeviceUser', 'tokenDeviceUser')
      .where('phone.phoneNumber ILIKE :phoneNumber', {
        phoneNumber: criteria.PhoneNumber.phoneNumber,
      })
      .getOne();
    //! HAY QUE IMPLEMENTAR LOS MAPPERS PARA PASAR DE ENTITY A CLASE DE DOMINIO
    //RECORDAR QUE SE DEBE TRASLADAR DE ALGUNA MANERA EL RESULTADO DE LA CONSULTA A LA ENTIDAD USER Y PHONENUMBER COMO VO
      return user ? await this.userMapper.ToDomain(user): null
  }
}
