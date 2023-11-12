import { SongArtist } from 'src/common/infrastructure/entities/songArtist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from 'src/artists/domain/artist';
import { PlaylistCreator } from 'src/common/infrastructure/entities/playlistCreator.entity';

@Entity('Artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false, unique: true })
  image_reference: string;

  @OneToMany(() => SongArtist, (songArtist) => songArtist.artist)
  song_artist: SongArtist[];

  @OneToMany(() => PlaylistCreator, (playlistCreator) => playlistCreator.artist)
  playlistCreator: PlaylistCreator[];
}
