import { Not, QueryRunner, Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../../domain/userAggregate/user';
import { UserEntity } from '../entities/users.entity';
import { Phone } from 'src/phones/domain/phoneAggregate/phone';
import { IUserRepository } from '../../domain/IUserRepository';
import { DataSourceSingleton } from 'src/common/infrastructure/dataSourceSingleton';
import { Imapper } from 'src/common/Application/IMapper';
import { Result } from 'src/common/domain/logic/Result';
import { run } from 'jest';
import { ItransactionHandler } from '../../../common/domain/transaction_handler/transaction_handler';
import { TransactionHandlerImplementation } from '../../../common/infrastructure/transaction_handler_implementation';

export class OrmUserRepository
  extends Repository<UserEntity>
  implements IUserRepository
{
  userMapper: Imapper<User, UserEntity>;

  constructor(userMapper: Imapper<User, UserEntity>) {
    super(UserEntity, DataSourceSingleton.getInstance().manager);
    this.userMapper = userMapper;
  }

  async createUser(
    user: User,
    runner?: TransactionHandlerImplementation,
  ): Promise<Result<User>> {
    const createdUser = await this.userMapper.domainTo(user);
    const runnerTransaction = runner.getRunner();
    await runnerTransaction.manager.save(createdUser); //this.save(createdUser);
    return Result.success<User>(user);
  }

  async updateUser(
    user: User,
    runner?: TransactionHandlerImplementation,
  ): Promise<Result<void>> {
    const updatedUser = await this.userMapper.domainTo(user);
    const runnerTransaction = runner.getRunner();
    await runnerTransaction.manager.save(updatedUser); //this.save(updatedUser);
    return Result.success<void>(void 0);
  }

  async findById(userId: string): Promise<User> {
    const user = await this.createQueryBuilder('user')
      .innerJoinAndSelect('user.phone', 'phone')
      .innerJoinAndSelect('phone.linePhone', 'linePhone')
      .leftJoinAndSelect('user.tokenDeviceUser', 'tokenDeviceUser')
      .where('user.id = :id', {
        id: userId,
      })
      .getOne();
    return user ? this.userMapper.ToDomain(user) : null;
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
    return usersDomain;
  }

  async finderCriteria(
    criteria: Partial<Phone>,
    runner?: TransactionHandlerImplementation,
  ): Promise<User | undefined> {
    const runnerTransaction = runner.getRunner();
    //
    const user = await runnerTransaction.manager
      .createQueryBuilder<UserEntity>(UserEntity, 'user')
      .innerJoinAndSelect('user.phone', 'phone')
      .innerJoinAndSelect('phone.linePhone', 'linePhone')
      .leftJoinAndSelect('user.tokenDeviceUser', 'tokenDeviceUser')
      .where('phone.phoneNumber ILIKE :phoneNumber', {
        phoneNumber: criteria.PhoneNumber.phoneNumber,
      })
      .getOne();
    return user ? await this.userMapper.ToDomain(user) : null;
  }
}
