import { SongArtist } from 'src/common/infrastructure/entities/songArtist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from 'src/artists/domain/artist';
import { Playlist } from 'src/playlist/domain/playlist';
import { PlaylistCreator } from 'src/common/infrastructure/entities/playlistCreator.entity';
import { PlaylistSong } from 'src/common/infrastructure/entities/playlistSong';

@Entity('Playlists')
export class PlaylistEntity extends Playlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false, unique: true })
  image_reference: string;

  @Column({ type: 'number', default: 0 })
  reproductions: number;

  @OneToMany(
    () => PlaylistCreator,
    (playlistCreator) => playlistCreator.playlist,
  )
  playlistCreator: SongArtist[];

  @OneToMany(() => PlaylistSong, (playlistSong) => playlistSong.playlist)
  playlistSong: PlaylistSong[];
}
