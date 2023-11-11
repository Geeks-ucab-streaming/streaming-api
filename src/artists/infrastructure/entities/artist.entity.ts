import { SongArtist } from 'src/common/infrastructure/entities/songArtist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from 'src/artists/domain/artist';

@Entity('Artists')
export class ArtistEntity extends Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false, unique: true })
  image_reference: string;

  @OneToMany(() => SongArtist, (songArtist) => songArtist.artist)
  song_artist: SongArtist[];
}