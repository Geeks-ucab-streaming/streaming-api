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
import { DataSourceSingleton } from 'src/common/infrastructure/dataSourceSingleton';
import {
  GetSongByIdService,
  GetSongByIdServiceDto,
} from 'src/songs/application/services/getSongById.service';
import { createReadStream } from 'fs';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { SongID } from 'src/songs/domain/value-objects/SongID-valueobject';

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
    client.data = { currentStream: null };
  }

  handleDisconnect(client: Socket) {
    console.log('cliente desconectado: ', client.id);
  }

  @SubscribeMessage('message-from-client')
  async sendSong(
    client: Socket,
    payload: { preview: boolean; songId: string; second: number | 0 },
  ) {
    // Si hay un stream actual, lo cerramos
    if (client.data.currentStream) {
      client.data.currentStream.destroy();
      client.data.currentStream = null;
    }
    let cont = 0;
    const getSongByIdServiceDto: GetSongByIdServiceDto = {
      id: SongID.create(payload.songId),
    };
    console.log(payload.songId);
    console.log(getSongByIdServiceDto);
    const song: Song = (
      await this.getSongByIdService.execute(getSongByIdServiceDto)
    ).value;

    const filePath: string = `https://desarrollosoundspace.blob.core.windows.net/${
      payload.preview
        ? process.env.PREVIEWS_CONTAINER
        : process.env.SONGS_CONTAINER
    }/${song.AudioReference}`;

    console.log(filePath);

    try {
      client.emit('song-duration', { duration: song.Duration }); //mando la duracion para la barra de carga

      const songLength = (await axios.head(filePath)).headers['content-length'];
      const initialByte =
        payload.second * Math.floor(songLength / song.Duration);
      const response = await axios.get(filePath, {
        responseType: 'stream',
        headers: {
          Range: `bytes=${String(initialByte)}-${songLength}`,
        },
      });

      // Guardamos el stream actual en el objeto Socket
      client.data.currentStream = response.data;

      response.data.on('data', (chunk: Buffer) => {
        cont++;
        client.emit('message-from-server', { chunk });
        console.log(cont);
      });

      response.data.on('end', () => {
        console.log('Streaming complete');
        client.data.currentStream = null;
      });
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  }
}
