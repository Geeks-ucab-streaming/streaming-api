import { ITokenUserRepository } from '../../domain/tokenUser.repository';
import { Repository } from 'typeorm';
import { TokenDeviceUserEntity } from '../entities/tokenDeviceUser.entity';
import { UserEntity } from '../entities/users.entity';
import { DataSourceSingleton } from '../../../common/infrastructure/dataSourceSingleton';
import { Token } from '../../domain/userAggregate/value-objects/token';
import { Imapper } from '../../../common/Application/IMapper';
import { User } from '../../domain/userAggregate/user';
import { TransactionHandlerImplementation } from '../../../common/infrastructure/transaction_handler_implementation';


export class OrmTokenRepository  extends Repository<TokenDeviceUserEntity> implements ITokenUserRepository {
  tokenMapper: Imapper<Token, TokenDeviceUserEntity>;
  constructor(
    tokenMapper: Imapper<Token, TokenDeviceUserEntity>
  ) {

    super(TokenDeviceUserEntity, DataSourceSingleton.getInstance().manager);
    this.tokenMapper = tokenMapper;
  }

  async findTokens(): Promise<string[]> {
    return await this.createQueryBuilder('tokenDeviceUser')
      .select('tokenDeviceUser.token')
      .getMany()
      .then((tokens) => tokens.map((token) => token.token));
     }

  async saveToken(token: Token, runner?: TransactionHandlerImplementation): Promise<void> {
    const tokenOrm = await this.tokenMapper.domainTo(token)
    const runnerTransaction = runner.getRunner()
    await runnerTransaction.manager.save(tokenOrm)
    return void 0;
  }

}