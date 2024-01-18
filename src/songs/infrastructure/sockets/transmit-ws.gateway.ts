import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Song } from 'src/songs/domain/song';
import { OrmSongRepository } from '../repositories/song.repository.impl';
import { DataSourceSingleton } from 'src/common/infrastructure/dataSourceSingleton';
import {
  GetSongByIdService,
  GetSongByIdServiceDto,
} from 'src/songs/application/services/getSongById.service';
import axios from 'axios';
import { SongID } from 'src/songs/domain/value-objects/SongID-valueobject';
import { JwtService } from '@nestjs/jwt';
import { jwtcontanst } from 'src/users/application/constants/jwt.constansts';

@WebSocketGateway({ cors: true }) // RUTA: http://localhost:3000/socket.io/socket.io.js
export class TransmitWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly getSongByIdService: GetSongByIdService =
    new GetSongByIdService(
      new OrmSongRepository(DataSourceSingleton.getInstance()),
    );
  private readonly jwtService: JwtService = new JwtService();
  private id: string;
  private subscription: string;

  constructor() {}
  async handleConnection(client: Socket) {
    console.log('cliente conectado: ', client.id);
    client.data = { currentStream: null, stop: false };
    const token = client.handshake.auth.token;
    console.log(token);
    const userInfo = await this.jwtService.decode(token);
    this.id = userInfo.id;
    this.subscription = userInfo.subscription;
    console.log(this.id);
    console.log(this.subscription);
  }
  // {
  //   secret: jwtcontanst.secret,
  // }

  handleDisconnect(client: Socket) {
    console.log('cliente desconectado: ', client.id);
    client.data.currentStream = null;
    client.data.stop = true;
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
    client.data.stop = false;

    const filePath: string = `https://desarrollosoundspace.blob.core.windows.net/${
      this.sendPreview(this.subscription)
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
        if (!client.data.stop) {
         cont++;
          client.emit('message-from-server', { chunk });
          console.log(cont);
        }
      });

      client.on('client-stopping', () => {
        client.data.stop = true;
        console.log('paro la cancion');
      });

      response.data.on('end', () => {
        console.log('Streaming complete');
        client.emit('message-from-server', { chunk: [] });
        client.data.currentStream = null;
      });
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  }

  sendPreview(sub: string): boolean {
    switch (sub) {
      case 'premium':
        return false;
      case 'vencido':
        return true;
      case 'eliminado':
        return true;
      case 'gratuito':
        return true;
      default:
        return true;
    }
  }
}
