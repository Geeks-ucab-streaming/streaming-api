import { SongArtist } from 'src/common/infrastructure/entities/songArtist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Playlist } from 'src/playlist/domain/playlist';
import { PlaylistCreator } from 'src/common/infrastructure/entities/playlistCreator.entity';
import { PlaylistSongEntity } from 'src/common/infrastructure/entities/playlistSong.entity';
import { ReproducedPlaylist } from 'src/common/infrastructure/entities/ReproducedPlaylist.entity';

@Entity('Playlists')
export class PlaylistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false, unique: true })
  image_reference: string;

  @Column({ type: 'int', default: 0 })
  reproductions: number;

  @Column({ type: 'int', default: 0 })
  duration: number;

  @Column({ type: 'boolean', default: false })
  isAlbum: boolean;

  @OneToMany(
    () => PlaylistCreator,
    (playlistCreator) => playlistCreator.playlist,
  )
  playlistCreator: SongArtist[];

  @OneToMany(() => PlaylistSongEntity, (playlistSong) => playlistSong.playlist)
  playlistSong: PlaylistSongEntity[];

  @OneToMany(
    () => ReproducedPlaylist,
    (reproducedPlaylist) => reproducedPlaylist.playlist,
  )
  reproducedPlaylist: ReproducedPlaylist[];
}
