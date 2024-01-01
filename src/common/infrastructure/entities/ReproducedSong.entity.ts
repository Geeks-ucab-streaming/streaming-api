import { ArtistEntity } from 'src/artists/infrastructure/entities/artist.entity';
import { PlaylistEntity } from 'src/playlist/infrastructure/entities/playlist.entity';
import { SongEntity } from 'src/songs/infrastructure/entities/song.entity';
import { UserEntity } from '../../../users/infrastructure/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Reproduced_Song')
export class ReproducedSong {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  reproduced_date: Date;

  @ManyToOne(() => SongEntity, (song) => song.reproducedSong)
  song: SongEntity;

  @ManyToOne(() => UserEntity, (user) => user.reproducedSong)
  user: UserEntity;
}
