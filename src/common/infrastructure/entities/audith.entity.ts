import { PlaylistEntity } from 'src/playlist/infrastructure/entities/playlist.entity';
import { SongEntity } from 'src/songs/infrastructure/entities/song.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Audith')
export class PlaylistSongEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date', nullable: true })
  added_date: Date;

  @Column({ type: 'varchar', nullable: true })
  operation:string;

  @Column({ type: 'varchar', nullable: true })
  data:string;
}
