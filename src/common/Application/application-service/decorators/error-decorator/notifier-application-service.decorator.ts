import { Result } from "src/common/domain/logic/Result";
import { IApplicationService } from "../../application.service.interface";
import { ApplicationServiceDecorator } from "./application.service.decorator";
import { NotificationHandler } from "../../../notificaciont-handler/notification-handler";

/** NotifierApplicationServiceDecorator: Es un decorador para enviar notificaciones.*/
export class NotifierApplicationServiceDecorator<D, R> extends ApplicationServiceDecorator<D, R> {

    constructor(applicationService: IApplicationService<D, R>, private readonly notifier: NotificationHandler<D>) {
        super(applicationService);
    }

    async execute(dto: D): Promise<Result<R>> {
        const result = await super.execute(dto);
        await this.notifier.send(dto);
        return result;
    }
}