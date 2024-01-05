import { ITokenUserRepository } from 'src/users/domain/tokenUser.repository';
import { Repository } from 'typeorm';
import { TokenDeviceUserEntity } from 'src/users/infrastructure/entities/tokenDeviceUser.entity';
import { DataSourceSingleton } from 'src/common/infrastructure/dataSourceSingleton';
import { TokenEntity } from 'src/users/domain/userAggregate/entities/token';
import { Imapper } from 'src/common/Application/IMapper';
import { User } from 'src/users/domain/userAggregate/user';
import { Result } from 'src/common/domain/logic/Result';

export class TokenRepositoryMock extends Repository<TokenDeviceUserEntity> implements ITokenUserRepository {
  private readonly tokens: TokenEntity[] = [];

  constructor() {
    super(TokenDeviceUserEntity, DataSourceSingleton.getInstance().manager);
  }

   async findTokens(): Promise<any> {
    return this.tokens;
  }

  async saveToken(token: TokenEntity): Promise<void> {
    this.tokens.push(token);
    return void 0;
  }
}