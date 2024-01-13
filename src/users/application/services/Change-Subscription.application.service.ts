import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { NotificationHandler } from "src/common/Application/notificaciont-handler/notification-handler";
import { Result } from "src/common/domain/logic/Result";
import { IUserRepository } from "src/users/domain/IUserRepository";
import { User } from "src/users/domain/userAggregate/user";
import { userSubscriptionDto } from "./Change-Subscription-Notification.application.service";
import { userSuscriptionState } from "src/users/domain/userAggregate/value-objects/userSuscriptionState";

interface changeSubscriptionDto {
    id: string;
    newState: string;
    }

export class ChangeSusbscriptionStateService implements IApplicationService<changeSubscriptionDto, User> {
    private notifiers: NotificationHandler<userSubscriptionDto>[] = [];
    constructor(private readonly repo: IUserRepository) {}
    get name(): string {
      throw new Error("Method not implemented.");
    }

    async execute(newState: changeSubscriptionDto ): Promise<Result<User>>{
      const user = await this.repo.findById(newState.id);
      const beforeNotification = user.SuscriptionState.SuscriptionState;
      user.updateUsersSuscriptionState(userSuscriptionState.create(newState.newState, user.SuscriptionState.suscription_date)); 
      await this.repo.updateUser(user); 

        const dto: userSubscriptionDto = {
            notification: {
            title: "Change subscription state",
            body: "The subscription state has been changed to " + newState.newState + " from " + beforeNotification 
            },
            token: [],
        };
        
        await Promise.all(this.notifiers.map((notifier) => notifier.send(dto)));

      return Result.success<User>(user);
    }
    
}