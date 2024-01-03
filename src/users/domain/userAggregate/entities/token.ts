export class TokenEntity {

  private readonly _token: string;
  private readonly _userId: string;
  constructor(
    token: string,
    userId: string
  ) {
    this._token = token;
    this._userId = userId;
  }

  get token(): string {
    return this._token;
  }
  get userId(): string {
    return this._userId;
  }
  static create(token: string,userId: string): TokenEntity {
    return new TokenEntity(token,userId);
  }
}