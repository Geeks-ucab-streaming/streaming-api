import { Cron } from '@nestjs/schedule';
import {
  SubscriptionNotifier,
} from 'src/users/application/services/Change-Subscription-Notification.application.service';
import { UsersMapper } from 'src/users/infrastructure/mappers/User.mapper';
import { OrmUserRepository } from 'src/users/infrastructure/repositories/user.repository.impl';
import { FirebaseNotificationSender } from 'src/users/infrastructure/subscription-notifier/subscription-notifier';
import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { calculateDaysToEndSubscription } from '../../../users/domain/services/calculateDaysToEndSubscription';

import { OrmTokenRepository } from 'src/users/infrastructure/repositories/token.repository.impl';
import { TokenMapper } from 'src/users/infrastructure/mappers/token.mapper';
import { UsersForDtoMapper } from 'src/users/infrastructure/mappers/UserForDto.mapper';

@Injectable()
export class CronSchedulerService {
  private usersMapper: UsersMapper = new UsersMapper();
  private userRepository: OrmUserRepository = new OrmUserRepository(
    this.usersMapper,
  );
  private notifier: SubscriptionNotifier<admin.messaging.Messaging> =
    new SubscriptionNotifier<admin.messaging.Messaging>(
      new FirebaseNotificationSender(),
      this.userRepository,
    );
  private userMapperDto = new UsersForDtoMapper();
  constructor() {}

  @Cron('*/20 * * * * *')
  async send() {
    const users = await this.userRepository.findAll();
    users.map((user) => {
      const daysUntilExpiration =
        calculateDaysToEndSubscription.daysToEndSubscription(
          user.SuscriptionState.suscription_date,
        );
      return user.Token.map(async (tokens) => {
        if (daysUntilExpiration < 30 && daysUntilExpiration >= 25 ) {
          await this.notifier.send({
            //EXAMPLE FOR NOTIFICATION
            notification: {
              title: 'Subscripcion por vencer',
              body:
                'Su subscripcion se vencera en ' +
                daysUntilExpiration +
                ' dias',
            },

            token: [tokens.token],
          });
          console.log('enviando notificacion');
          return tokens.token;
        }
      });
    });
  }
}
