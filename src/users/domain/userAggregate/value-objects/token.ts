import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class Token implements IValueObject<Token>{

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
  static create(token: string,userId: string): Token {
    return new Token(token,userId);
  }

  public equals(userToken: Token): boolean {
    return this.token === userToken.token;
}

}