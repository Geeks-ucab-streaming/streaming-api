import { Result } from "./Result";

// src/domain/ports/NotificationSender.ts

export interface NotificationSender<T> {
    sendNotification(token: string[], title: string, body: string): Promise<Result<void|Error>>;
  }