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
import { UsersForDtoMapper } from 'src/users/infrastructure/mappers/UserForDto.mapper';

@Injectable()
export class CronSchedulerService {
  private usersMapper: UsersMapper;
  private userRepository: OrmUserRepository;
  private notifier: SubscriptionNotifier<admin.messaging.Messaging>;
  private userMapperDto: UsersForDtoMapper;

  constructor() {
    this.userMapperDto = new UsersForDtoMapper();
    this.usersMapper = new UsersMapper();
    this.userRepository = new OrmUserRepository(this.usersMapper);
    this.notifier = new SubscriptionNotifier<admin.messaging.Messaging>(new FirebaseNotificationSender(), this.userRepository);
  }

  @Cron('*/60 * * * * *')
  async send() {
      const users = await this.userRepository.findAll();
      console.log(users,"los usuarios")
      users.map((user) => {
      const daysUntilExpiration = calculateDaysToEndSubscription.daysToEndSubscription(user.SuscriptionState.suscription_date)
        return user.Token.map(async (tokens) => {
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
