export interface ITokenUserRepository {
  findTokens(): Promise<string[]>
}