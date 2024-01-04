import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Result } from '../domain/logic/Result';

export class MyResponse<T> {
  public readonly data?: T;
  public readonly statusCode: number;
  public readonly error?: Error;
  public readonly message?: string;

  private constructor(
    statusCode: number,
    data?: T,
    error?: Error,
    message?: string,
  ) {
    data ? (this.data = data) : null;
    this.statusCode = statusCode;
    error ? (this.error = error) : null;
    this.message ? (this.message = this.message) : null;
  }

  static fromResult<T>(result: Result<T>): MyResponse<T> {
    if (result.IsSuccess) {
      return new MyResponse(result.statusCode || 200, result.Value);
    } else {
      this.handleError(result.statusCode, result.message, result.error);
    }
  }

  static success<T>(data: T, statusCode?: number | 200): MyResponse<T> {
    return new MyResponse(statusCode ? statusCode : 200, data);
  }

  static fail<T>(statusCode: number, message: string, error?: any) {
    this.handleError(statusCode, message, error);
  }
  static handleError(statusCode: number, message: string, error?: any) {
    switch (statusCode) {
      case 400:
        throw new BadRequestException(message, error);
      case 403:
        throw new ForbiddenException(message, error);
      case 404:
        throw new NotFoundException(message, error);
      default:
        throw new InternalServerErrorException(message, error);
    }
  }
}
