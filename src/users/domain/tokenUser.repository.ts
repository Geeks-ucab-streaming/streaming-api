import { TokenEntity } from './userAggregate/entities/token';

export interface ITokenUserRepository {
  findTokens(): Promise<string[]>
  saveToken(token: TokenEntity): Promise<void>
}