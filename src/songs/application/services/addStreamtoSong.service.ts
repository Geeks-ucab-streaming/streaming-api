import { IArtistsRepository } from 'src/artists/domain/IArtistsRepository';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';
import { IPlaylistStreamRepository } from 'src/common/domain/repositories/IPlaylistStreamRepository';
import { IStreamRepository } from 'src/common/domain/repositories/ISongStreamRepository';
import { IPlaylistRepository } from 'src/playlist/domain/IPlaylistRepository';
import { ISongRepository } from 'src/songs/domain/ISongRepository';
import {
  GetSongByIdService,
  GetSongByIdServiceDto,
} from './getSongById.service';
import { Song } from 'src/songs/domain/song';
import { userId } from 'src/users/domain/userAggregate/value-objects/userId';
import { SongID } from 'src/songs/domain/value-objects/SongID-valueobject';
import { PlaylistID } from 'src/playlist/domain/value-objects/PlaylistID-valueobject';

export class StreamDto {
  user: userId;
  song: SongID;
  playlist?: PlaylistID;
}

export class AddStreamToSongService
  implements IApplicationService<StreamDto, void>
{
  private readonly streamsRepository: IStreamRepository;
  private readonly playlistStreamsRepository: IPlaylistStreamRepository;
  private readonly artistRepository: IArtistsRepository;
  private readonly songRepository: ISongRepository;
  private readonly playlistRepository: IPlaylistRepository;

  constructor(
    streamsRepository: IStreamRepository,
    playlistStreamsRepository: IPlaylistStreamRepository,
    artistRepository: IArtistsRepository,
    songRepository: ISongRepository,
    playlistRepository: IPlaylistRepository,
  ) {
    this.streamsRepository = streamsRepository;
    this.playlistStreamsRepository = playlistStreamsRepository;
    this.artistRepository = artistRepository;
    this.songRepository = songRepository;
    this.playlistRepository = playlistRepository;
  }
  get name(): string {
    return this.constructor.name;
  }
  async execute(dto: StreamDto): Promise<Result<void>> {
    const song: Song = await this.songRepository.findById(dto.song);
    await this.streamsRepository.saveSongStream(dto.user, dto.song);
    await this.songRepository.saveStream(dto.song);
    for (const artist of song.Artists) {
      await this.artistRepository.saveStream(artist);
    }
    if (dto.playlist) {
      const save = await this.playlistStreamsRepository.savePlaylistStream(
        dto.user,
        dto.playlist,
      );
      if (save) await this.playlistRepository.saveStream(dto.playlist);
    }
    return;
  }
}
