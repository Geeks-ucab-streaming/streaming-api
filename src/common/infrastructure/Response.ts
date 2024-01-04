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
  public readonly error?: { statusCode: string; message: string };

  private constructor(
    data: T,
    statusCode: number,
    error?: { statusCode: string; message: string },
  ) {
    this.data = data;
    this.statusCode = statusCode;
    this.error = error;
  }

  static fromResult<T>(result: Result<T>): MyResponse<T> {
    if (result.IsSuccess) {
      return new MyResponse(result.Value, result.statusCode || 200);
    } else {
      this.handleError(result.statusCode, result.message, result.error);
    }
  }

  static success<T>(data: T, statusCode?: number | 200): MyResponse<T> {
    return new MyResponse(data, statusCode ? statusCode : 200);
  }

  static fail(statusCode: number, message: string, error?: any) {
    return this.handleError(statusCode, message, error);
  }
  static handleError(statusCode: number, message: string, error?: any) {
    switch (statusCode) {
      case 400:
        throw new BadRequestException(message, error);
      case 403:
        throw new ForbiddenException(message, error);
      case 404:
        throw new NotFoundException(message, error);
      case 500:
        throw new InternalServerErrorException(message, error);
    }
  }
}
