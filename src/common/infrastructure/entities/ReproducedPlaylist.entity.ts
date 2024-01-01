import { ArtistEntity } from 'src/artists/infrastructure/entities/artist.entity';
import { PlaylistEntity } from 'src/playlist/infrastructure/entities/playlist.entity';
import { SongEntity } from 'src/songs/infrastructure/entities/song.entity';
import { UserEntity } from '../../../users/infrastructure/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Reproduced_Playlist')
export class ReproducedPlaylist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  reproduced_date: Date;

  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.reproducedPlaylist)
  playlist: PlaylistEntity;

  @ManyToOne(() => UserEntity, (user) => user.reproducedSong)
  user: UserEntity;
}
