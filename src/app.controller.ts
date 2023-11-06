/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Hello')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiTags('Prueba')
  @Get('algo')
  getPrueba(): string {
    return this.appService.getHello();
  }
}
