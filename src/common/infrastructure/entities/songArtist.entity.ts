import { ArtistEntity } from 'src/artists/infrastructure/entities/artist.entity';
import { SongEntity } from 'src/songs/infrastructure/entities/song.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Song_Artist')
export class SongArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SongEntity, (song) => song.song_artist)
  song: SongEntity;

  @ManyToOne(() => ArtistEntity, (artist) => artist.song_artist)
  artist: ArtistEntity;
}