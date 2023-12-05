import { Inject } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { IFindService } from 'src/common/domain/ifind.service';
import { Song } from 'src/songs/domain/song';

@WebSocketGateway({ cors: true })
export class TransmitWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject('GetSongById')
    private readonly getSongService: IFindService<String, Song>,
    @Inject('GetAudioService')
    private readonly getAudioService: IFindService<string, Buffer>,
  ) {}
  handleConnection(client: Socket) {
    console.log('cliente conectado: ', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('cliente desconectado: ', client.id);
  }

  @SubscribeMessage('message-from-client')
  async sendSong(client: Socket, songId: string) {
    console.log('hola');
    const song: Song = await this.getSongService.execute(songId);
    const file = await this.getAudioService.execute(
      song.songAudio_reference.get(),
    );
    console.log(file);
    const chunkSize = 1024;

    try {
      for (let i = 0; i < file.length; i += chunkSize) {
        const chunkData = file.slice(i, i + chunkSize);
        client.emit('message-from-server', {
          chunk: chunkData,
        });
        client.emit('song-transfer-complete');
      }
    } catch (error) {
      console.error('Error al enviar el archivo por WebSocket:', error);
    }
  }
}
