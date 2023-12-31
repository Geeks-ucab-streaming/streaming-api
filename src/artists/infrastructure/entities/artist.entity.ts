import { PlaylistCreator } from 'src/common/infrastructure/entities/playlistCreator.entity';
import { SongArtist } from 'src/common/infrastructure/entities/songArtist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Artists' })
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false, unique: true })
  image_reference: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  reproductions: number;

  @OneToMany(() => SongArtist, (songArtist) => songArtist.artist)
  song_artist: SongArtist[];

  @OneToMany(() => PlaylistCreator, (playlistCreator) => playlistCreator.artist)
  playlistCreator: PlaylistCreator[];

  static async create(
    id: string,
    name: string,
    image_reference: string,
  ): Promise<ArtistEntity> {
    const artist = new ArtistEntity();
    artist.id = id;
    artist.name = name;
    artist.image_reference = image_reference;
    return artist;
  }
}
