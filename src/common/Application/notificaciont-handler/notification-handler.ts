import { Result } from "src/common/domain/logic/Result";

export interface NotificationHandler<T> {
    send(message: T): Promise<Result<void>>;
}
