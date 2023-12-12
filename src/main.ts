import * as dotenv from 'dotenv';
dotenv.config({ path: `./deploy/.env.${process.env.NODE_ENV}` });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './docs/swagger.docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  swagger(app);

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
