import { ArtistEntity } from 'src/artists/infrastructure/entities/artist.entity';
import { PlaylistEntity } from 'src/playlist/infrastructure/entities/playlist.entity';
import { SongEntity } from 'src/songs/infrastructure/entities/song.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Playlist_Creator')
export class PlaylistCreator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date', nullable: false })
  creation_date: Date;

  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.playlistCreator)
  playlist: PlaylistEntity;

  @ManyToOne(() => ArtistEntity, (artist) => artist.playlistCreator)
  artist: ArtistEntity;
}