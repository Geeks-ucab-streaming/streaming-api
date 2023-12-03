import { Imapper } from 'src/core/application/IMapper';
import { Song } from 'src/songs/domain/song';
import { SongEntity } from '../entities/song.entity';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';

export class SongsMapper implements Imapper<Song, SongEntity> {
  private readonly getSongImageService: GetFileService;

  constructor() {
    this.getSongImageService = new GetFileService(
      process.env.SONG_ALBUM_PLAYLIST_CONTAINER,
    );
  }

  domainToOrm(domainEntity: Song): Promise<SongEntity> {
    throw new Error('Method not implemented.');
  }
  async ormToDomain(ormEntity: SongEntity): Promise<Song> {
    let song: Song = new Song(
      ormEntity.id,
      ormEntity.name,
      ormEntity.duration,
      ormEntity.creation_date,
      ormEntity.song_reference,
      ormEntity.preview_reference,
      ormEntity.image_reference,
      ormEntity.reproductions,
      ormEntity.genres,
      this.operation(ormEntity),
    );
    const songImage = await this.getSongImageService.execute(
      song.image_reference,
    );
    song.songImage = songImage;
    return song;
  }
  private operation(songResponse: SongEntity): string[] {
    let artists: string[] = [];
    songResponse.song_artist.map((artist_song) => {
      artists.push(artist_song.artist.id);
    });
    return artists;
  }
}
