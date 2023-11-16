import { DomainException } from "../domain.exceptions";

export class Result<T> {
  public statusCode: number;
  public message: string;
  public error: DomainException | string;
  public value : T;
  private _value: T;

  public constructor(isSuccess: boolean, error?: DomainException, value?: T) {

      if (error) {
        console.log(error.httpStatus);
            this.statusCode = error.errorCode ? error.httpStatus : 500;
            this.message = error?.message ? error?.message : "Unknown.";
            this.error = "Internal Domain Error";
        }
        else {
          this.statusCode = 200;
          this.message = "OK";
          this.value = value;
        }

    Object.freeze(this);
  }

  public getValue(): T {
    if (this.statusCode !== 200) {
      console.log(this.error);
      throw new Error(
        "No se puede obtener el valor de un resultado de error. Use 'errorValue' en su lugar.",
      );
    }

    return this._value;
  }

  public errorValue(): T {
    return this.error as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(error: any): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (let result of results) {
      if (result.error) return result;
    }
    return Result.ok();
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};
