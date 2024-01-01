export class DomainException<T> extends Error {
  public readonly errorCode: string;
  public readonly httpStatus: number;
  constructor(
    public readonly entity: T,
    message?: string,
    errorCode?: string,
    httpStatus?: number,
  ) {
    super(message);
    this.errorCode = errorCode || '';
    this.httpStatus = httpStatus || 0;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
