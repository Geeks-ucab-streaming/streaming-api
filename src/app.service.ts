import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World with CI! AL FIN LA INTEGRACION  2';
  }
}
