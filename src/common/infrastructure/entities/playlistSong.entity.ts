import { PlaylistEntity } from 'src/playlist/infrastructure/entities/playlist.entity';
import { SongEntity } from 'src/songs/infrastructure/entities/song.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Playlist_Song')
export class PlaylistSongEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date', nullable: false })
  added_date: Date;

  @ManyToOne(() => SongEntity, (song) => song.playlistSong)
  song: SongEntity;

  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.playlistSong)
  playlist: PlaylistEntity;
}
