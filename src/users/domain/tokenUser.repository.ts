import { Token } from './userAggregate/value-objects/token';
import { ItransactionHandler } from '../../common/domain/transaction_handler/transaction_handler';

export interface ITokenUserRepository {
  findTokens(): Promise<string[]>
  saveToken(token: Token, runner? : ItransactionHandler): Promise<void>
}