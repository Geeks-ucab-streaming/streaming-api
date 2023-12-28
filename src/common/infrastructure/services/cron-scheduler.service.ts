import { Cron } from "@nestjs/schedule";
import { SubscriptionNotifier } from "src/users/application/services/Change-Subscription-Notification.application.service";
import { UsersMapper } from "src/users/infrastructure/mappers/User.mapper";
import { OrmUserRepository } from "src/users/infrastructure/repositories/user.repository.impl";
import { FirebaseNotificationSender } from "src/users/infrastructure/subscription-notifier/subscription-notifier";
import * as admin from 'firebase-admin';
import { Injectable } from "@nestjs/common";
3
@Injectable()
export class CronSchedulerService {
    private usersMapper: UsersMapper = new UsersMapper();
    private userRepository: OrmUserRepository = new OrmUserRepository(this.usersMapper);
    private notifier: SubscriptionNotifier<admin.messaging.Messaging> = new SubscriptionNotifier<admin.messaging.Messaging>( new FirebaseNotificationSender() ,this.userRepository);

    constructor() { }
    @Cron('* * 12 * * *')
    async notificationSubscriptionCron() {
      
        console.log('Every 3 seconds')
        return await this.notifier.send({
            //EXAMPLE FOR NOTIFICATION
            notification: {
              title: 'Estado de su Suscripcion',
              body: 'Su subscripcion esta en estatus talfin',
            },
         
            token: ['eqTEL5-UQzyIsz7SVs9GsV:APA91bEaUpWImdVGNLu15vWyCOBdwspBu4-m1EcG8NX6MLQ1OR9gz7pmJOQigGzGhBS0ZlNcXi1rweozzzQa6lhD99SKEgyZ7Xx3yLJWS58nTk2fyZdtVID2Im83W7jZeZ4afgRQK2vH',],
          })
    }
}
