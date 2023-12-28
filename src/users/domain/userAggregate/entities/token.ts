export class TokenEntity {

  private _token: string;
  constructor(
    token: string,
  ) {
    this._token = token;
  }

  get token(): string {
    return this._token;
  }
  static create(token: string): TokenEntity {
    return new TokenEntity(token);
  }
}