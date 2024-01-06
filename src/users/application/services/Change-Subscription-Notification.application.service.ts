import { HttpVersionNotSupportedException } from "@nestjs/common";
import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { NotificationHandler } from "src/common/Application/notificaciont-handler/notification-handler";
import { Result } from "src/common/domain/logic/Result";
import { NotificationSender } from "src/common/domain/logic/notificator.interface";
import { IUserRepository } from "src/users/domain/IUserRepository";
import { User } from "src/users/domain/userAggregate/user";

export interface userSubscriptionDto {
    notification: {
        title: string,
        body: string,
    };
    token: string[];
  }

export class SubscriptionNotifier<D> implements NotificationHandler<userSubscriptionDto> {

    constructor(
        private readonly admin :NotificationSender<D>,
        private readonly repo: IUserRepository,

        ) {}

    async send(dto: userSubscriptionDto ): Promise<Result<void>>{
        await this.admin.sendNotification(dto.token,dto.notification.title, dto.notification.body,);
        return Result.success<void>(void 0);
    }
  }