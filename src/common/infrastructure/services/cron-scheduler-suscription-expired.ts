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
import { ChangeSusbscriptionStateService } from 'src/users/application/services/Change-Subscription.application.service';

@Injectable()
export class CronSuscriptionExpiredService {
  private usersMapper: UsersMapper = new UsersMapper();
  private userRepository: OrmUserRepository = new OrmUserRepository(
    this.usersMapper,
  );
  private notifier: SubscriptionNotifier<admin.messaging.Messaging> =
    new SubscriptionNotifier<admin.messaging.Messaging>(
      new FirebaseNotificationSender(),
      this.userRepository,
    );
  private userMapperDto: UsersForDtoMapper = new UsersForDtoMapper();
  private changeSuscriptionStateService: ChangeSusbscriptionStateService =
    new ChangeSusbscriptionStateService(this.userRepository);

  constructor() {}

  @Cron('* * */10 * * *')
  public async send() {
    const users = await this.userRepository.findAll();
    users.map(async (user) => {
      const daysUntilExpiration =
        calculateDaysToEndSubscription.daysToEndSubscription(
          user.SuscriptionState.suscription_date,
        );
      if (daysUntilExpiration > 30) {
        const dtoUser = await this.userMapperDto.domainTo(user);
        await this.changeSuscriptionStateService.execute({
          id: dtoUser.id,
          newState: 'vencido',
        });
        return user.Token.map(async (tokens) => {
          await this.notifier.send({
            //EXAMPLE FOR NOTIFICATION
            notification: {
              title: 'Suscripción vencida',
              body: 'Su subscripcion se ha vencido, intente renovarla adquiriendo el plan premium nuevamente',
            },

            token: [tokens.token],
          });

          return tokens.token;
        });
      }
    });
  }
}
