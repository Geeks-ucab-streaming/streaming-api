import { TokenEntity } from './userAggregate/entities/token';
import { ItransactionHandler } from '../../common/domain/transaction_handler/transaction_handler';

export interface ITokenUserRepository {
  findTokens(): Promise<string[]>
  saveToken(token: TokenEntity, runner? : ItransactionHandler): Promise<void>
}