import { Cron } from "@nestjs/schedule";
import { SubscriptionNotifier } from "src/users/application/services/dummy-service-firebase";
import { UsersMapper } from "src/users/infrastructure/mappers/User.mapper";
import { OrmUserRepository } from "src/users/infrastructure/repositories/user.repository.impl";
import { FirebaseNotificationSender } from "src/users/infrastructure/subscription-notifier/subscription-notifier";
import * as admin from 'firebase-admin';
import { Injectable } from "@nestjs/common";

@Injectable()
export class CronSchedulerService {
    private usersMapper: UsersMapper = new UsersMapper();
    private userRepository: OrmUserRepository = new OrmUserRepository(this.usersMapper);
    private notifier: SubscriptionNotifier<admin.messaging.Messaging> = new SubscriptionNotifier<admin.messaging.Messaging>( new FirebaseNotificationSender() ,this.userRepository);

    constructor() { }
    @Cron('*/3 * * * * *')
    async notificationSubscriptionCron() {
        console.log('Every 3 seconds')
        return await this.notifier.send({
            //EXAMPLE FOR NOTIFICATION
            notification: {
              title: 'Estado de su Suscripcion',
              body: 'Su subscripcion esta en estatus talfin',
            },
         
            token: ['dfhygzT0QZG8Qt2gavQIdI:APA91bHr1cGJCUK9cfW7UuYOqH-dfqfRxP1Gp61riytbvoS7Y3kjRCu2NMGxb44wp_ChfCWbxDgbJ7W-4yTewALy4frn54S9sMcK5cN-XiKln9OcZfdFgrFydyffvH2wFtk5kCw20Pst',],
          })
    }
}