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

3;

@Injectable()
export class CronSchedulerService {
  private usersMapper: UsersMapper = new UsersMapper();
  private userRepository: OrmUserRepository = new OrmUserRepository(this.usersMapper);
  private notifier: SubscriptionNotifier<admin.messaging.Messaging> = new SubscriptionNotifier<admin.messaging.Messaging>(new FirebaseNotificationSender(), this.userRepository);
  constructor() {
  }

  @Cron('*/10 * * * * *')
  async notificationSubscriptionCron() {

      const users = await this.userRepository.findAll();
      const tokenUsers: string[] = [];
      users.map((user) => {
      const daysUntilExpiration = calculateDaysToEndSubscription.daysToEndSubscription(user.SuscriptionState.suscription_date)
        return user.Token.map(async (tokens) => {
          tokenUsers.push(tokens.token);
          await this.notifier.send({
            //EXAMPLE FOR NOTIFICATION
            notification: {
              title: 'Subscripcion por vencer',
              body: 'Su subscripcion se vencera en ' + daysUntilExpiration + ' dias',
            },

            token: [tokens.token],
          });
          return tokens.token;
        });

      });

  }
}
