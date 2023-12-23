// src/infrastructure/firebase/FirebaseNotificationSender.ts
import { NotificationSender } from 'src/common/domain/logic/notificator.interface'
import * as admin from 'firebase-admin';
import { Result } from 'src/common/domain/logic/Result';

export class FirebaseNotificationSender implements NotificationSender<admin.messaging.Messaging> {
    private readonly messaging: admin.messaging.Messaging;

  constructor() {
    admin.initializeApp({
        credential: admin.credential.cert({
          projectId: "streaming-api-8313d",
          privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+rTF+n5uNYJLg\nqH7jWxRP4T84i1cNx2t7ISJMA+bmCs2MsMgquabdaQcfGAMW9jJLgNXP6Twnc13d\nO3uPkx2QlpkPVfyBYHkqyZlAGXdHcJTQafq/bh3CKn9c3U2Iql6nYVYJCmgPTZYV\nsu/J3GWIkMFy+d14K55wXsADPgkGRvu8T6aeddBFD8Taps/gNvkV4Hq7irfPgofi\nUVZW4kfv00yMw0DQAqKjCuRH23nfU2NwEwEkqAFHPNQGYUqxVUuzN1d49ptQxo8+\n2XD3/L6pbhf+SdaVYZE65MFvBsjEKpU6DYZyda1xj1k7e7lpNWzMeA7L8kfTO6FF\nsTqEh2+fAgMBAAECggEAXk1w76OHfqX3LmYXD2HBy3nm1xPO87Efnq9182twnHBW\nVZEvBjZ4aQOjMoUhLg+IM2BeHqxHBGnhz+M1yn3jftmEjJmlvuTUOE2pXhLaM7ph\n1yu7CEcxL5DuGaMX0BIWqyiQMPt1GLByHHw5bLf0fVS+YBtkpaTJAOFTjKb3NqM1\nEpTzVZpy/ztRfyO7TyXr4JMG6++V62VOsm/o3cPPSIXZKchBCNXNnzKhSSM3ANTs\n86upQSvYhGN3g0Lxtmjg1UE2MZRPwN+9qKs5n7bkG3xM0DStNNdWkigfo2sO+t+e\nUhwQHInW9aA6N0FNZmAHcirBqgcUkhD95aEQEdF+kQKBgQDhdxaIaZbOjyAU8fCJ\nqHPeg39ENNjfo+jC85O6r/RS2n9Ba3WfdrOMuAv1KGSkk+h6KnWJphp7CZZsZkLC\n8/h7osQ4HaDrBwLqCRPwXZyjvHB1dMHokTz0pf9JZvzn4/vDTAxBXBLru6qRsdYV\n2WQpvDxxIvm1IewLzPGvtE/xDwKBgQDYf/pAxsaq6YFH0LEa9t9sLAUdv/Tdmbgn\nIfy5Vwi1SHfQGhnKvhhT7DPH7hOql7n9VSNafle9fJ5SX6OILuLtDrUx93A7V5gR\nHKHqLbdKbSnMmVba5QAHJuONHYMf0iOeboVvt5SL/8midrcFh41zFTUGsh+AndBP\nDvHE6dF4cQKBgQDTNk6Dh/bgli/Fr0hYjNfO8Xy9low8JT6dsrUHxGGrZEimLlbI\nBdj50EhTZ32wt2anWzM0uchAzqB99+Y+33I90CLlNsxSoATY3ZwyJl/g+1yWi8RD\nbBugTAk06CevzGFDePBaIjkPYITPa7tUSIyOlGpCyjMGvjp0a49VvCLPfQKBgHjD\n4odxme5KdGfn3HLrFLPVVkFDC0b1cUi656tHBj+BHfxCIvL52L4veq7ieavmGMRc\nUm0vHqg/NF1EpgbYCJMtahtmJ/+iG9wnuZXUTHLCs9dCDbXqmXpj0fisZrFAWcgN\nZHdt0vnJA+ORDwSRmXCBeuOyRmpLHaCL+Ibb2pGxAoGACJYdVrgBZeKXe74jjUl5\nwZjYRU7ypu12M3OpXuEAjo+gTFNTE/xl43d1uv6hSHzJS9mNwHyBrfnHeHgdbEZd\n99olKa2ZkHgas04fqBTcMiucefBHedRw3go9TxCYIa0+GYOo6iJHrj/X7Rl471qk\nH1098gK2cBAOQ8LKcPC+hPE=\n-----END PRIVATE KEY-----\n",
          clientEmail: "firebase-adminsdk-kiqii@streaming-api-8313d.iam.gserviceaccount.com",
        })
      });
    this.messaging = admin.messaging();
  }

  async sendNotification(token: string[], title: string, body: string): Promise<Result<void>> {
    for (const t of token) {
        const message = {
            notification: {
              title,
              body,
            },
            token:t,
          };
          await this.messaging.send(message)
    }
    

    return Result.success<void>(void 0);
  }
}