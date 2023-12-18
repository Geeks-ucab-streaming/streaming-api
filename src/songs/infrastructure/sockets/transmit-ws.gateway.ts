import { Inject } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { IFindService } from 'src/common/domain/ifind.service';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { Song } from 'src/songs/domain/song';

@WebSocketGateway({ cors: true }) // RUTA: http://localhost:3000/socket.io/socket.io.js
export class TransmitWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}
  handleConnection(client: Socket) {
    console.log('cliente conectado: ', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('cliente desconectado: ', client.id);
  }

  @SubscribeMessage('message-from-client')
  async sendSong(
    client: Socket,
    payload: { preview: boolean; fileName: string },
  ) {
    const getFileService: GetFileService = new GetFileService(
      payload.preview
        ? process.env.PREVIEWS_CONTAINER
        : process.env.SONGS_CONTAINER,
    );
    const file: Buffer = await getFileService.execute(payload.fileName);
    console.log('hola');
    const chunkSize = 1024;

    try {
      for (let i = 0; i < file.length; i += chunkSize) {
        const chunkData = file.slice(i, i + chunkSize);
        client.emit('message-from-server', {
          chunk: chunkData,
        });
        console.log('mandando');
      }
      console.log('acabó la transmision');
      client.emit('song-transfer-complete');
    } catch (error) {
      console.error('Error al enviar el archivo por WebSocket:', error);
    }
  }
}
