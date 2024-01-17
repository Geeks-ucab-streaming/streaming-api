import { Imapper } from 'src/common/Application/IMapper';
import { Song } from 'src/songs/domain/song';
import { SongEntity } from '../entities/song.entity';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';

export class SongsMapper implements Imapper<Song, SongEntity> {
  private readonly getSongImageService: GetFileService;

  constructor() {
    this.getSongImageService = new GetFileService(
      process.env.SONG_ALBUM_PLAYLIST_CONTAINER,
    );
  }

  domainTo(domainEntity: Song): Promise<SongEntity> {
    throw new Error('Method not implemented.');
  }
  async ToDomain(ormEntity: SongEntity): Promise<Song> {
    console.log(ormEntity);
    let song: Song = Song.create(
      ormEntity.id,
      ormEntity.name,
      ormEntity.duration,
      ormEntity.creation_date,
      ormEntity.song_reference,
      ormEntity.image_reference,
      ormEntity.reproductions,
      ormEntity.genres,
      this.operation(ormEntity),
    );
    const songImage = await this.getSongImageService.execute(
      song.ImageReference,
    );
    song.Image = songImage;
    return song;
  }
  private operation(songResponse: SongEntity): ArtistID[] {
    let artists: ArtistID[] = [];
    console.log(songResponse);
    songResponse.song_artist.map((artist_song) => {
      artists.push(ArtistID.create(artist_song.artist.id));
    });
    return artists;
  }
}
