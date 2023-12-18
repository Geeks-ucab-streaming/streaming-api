import * as dotenv from 'dotenv';
dotenv.config({ path: `./deploy/.env.${process.env.NODE_ENV}` });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './docs/swagger.docs';
import { Cron, CronExpression } from '@nestjs/schedule';
export class servicio {
  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    console.log('Called when the current second is 45');
  }
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  swagger(app);
  const ser = new servicio();
  ser.handleCron();
  //Cron job
  
  //firebaase configuration
  /*await admin.messaging().send({
    notification: {
      title: 'Hello',
      body: 'World',
    },
    data:{
      title: 'Hello',
      body: 'World',
    },
    token: 'dfhygzT0QZG8Qt2gavQIdI:APA91bHr1cGJCUK9cfW7UuYOqH-dfqfRxP1Gp61riytbvoS7Y3kjRCu2NMGxb44wp_ChfCWbxDgbJ7W-4yTewALy4frn54S9sMcK5cN-XiKln9OcZfdFgrFydyffvH2wFtk5kCw20Pst',
  }).then((response) => {
    console.log('Successfully sent message:', response);
  }
  ).catch((error) => {
    console.log('Error sending message:', error);
  });*/

  await app.listen(3000);
}
bootstrap();
