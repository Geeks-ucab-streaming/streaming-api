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
import { OrmSongRepository } from '../repositories/song.repository.impl';
import { DataSourceSingleton } from 'src/core/infrastructure/dataSourceSingleton';
import {
  GetSongByIdService,
  GetSongByIdServiceDto,
} from 'src/songs/application/services/getSongById.service';

@WebSocketGateway({ cors: true }) // RUTA: http://localhost:3000/socket.io/socket.io.js
export class TransmitWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly getSongByIdService: GetSongByIdService =
    new GetSongByIdService(
      new OrmSongRepository(DataSourceSingleton.getInstance()),
    );
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
    payload: { preview: boolean; songId: string },
  ) {
    const getFileService: GetFileService = new GetFileService(
      payload.preview
        ? process.env.PREVIEWS_CONTAINER
        : process.env.SONGS_CONTAINER,
    );
    const getSongByIdServiceDto: GetSongByIdServiceDto = { id: payload.songId };
    console.log(payload.songId);
    console.log(getSongByIdServiceDto);
    const song: Song = (
      await this.getSongByIdService.execute(getSongByIdServiceDto)
    ).value;
    const file: Buffer = await getFileService.execute(song.AudioReference);
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
