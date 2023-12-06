import { Imapper } from 'src/core/application/IMapper';
import { Song } from 'src/songs/domain/song';
import { SongEntity } from '../entities/song.entity';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { SongID } from 'src/songs/domain/value-objects/SongID-valueobject';
import { SongName } from 'src/songs/domain/value-objects/SongName-valueobject';
import { SongDuration } from 'src/songs/domain/value-objects/SongDuration-valueobject';
import { SongCreationDate } from 'src/songs/domain/value-objects/SongCreationDate-valueobject';
import { SongAudioReference } from 'src/songs/domain/value-objects/SongAudioReference-valueobject';
import { SongImageReference } from 'src/songs/domain/value-objects/SongImageReference-valueobject';
import { SongStreams } from 'src/songs/domain/value-objects/SongStreams-valueobject';

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
    songResponse.song_artist.map((artist_song) => {
      artists.push(ArtistID.create(artist_song.artist.id));
    });
    return artists;
  }
}
