import { ReproducedSong } from 'src/common/infrastructure/entities/ReproducedSong.entity';
import { PlaylistSongEntity } from 'src/common/infrastructure/entities/playlistSong.entity';
import { SongArtist } from 'src/common/infrastructure/entities/songArtist.entity';
import { Song } from 'src/songs/domain/song';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Songs')
export class SongEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  duration: string;

  @Column({ type: 'date', nullable: false })
  creation_date: Date;

  @Column({ type: 'text', nullable: false, unique: true })
  song_reference: string;

  @Column({ type: 'text', nullable: false, unique: true })
  preview_reference: string;

  @Column({ type: 'text', nullable: false, unique: true })
  image_reference: string;

  @Column({ type: 'int', nullable: false })
  reproductions: number;

  @Column({ type: 'text', array: true, nullable: false })
  genres: string[];

  @OneToMany(() => SongArtist, (songArtist) => songArtist.song)
  song_artist: SongArtist[];

  @OneToMany(() => PlaylistSongEntity, (playlistSong) => playlistSong.song)
  playlistSong: PlaylistSongEntity[];

  @OneToMany(() => ReproducedSong, (reproducedSong) => reproducedSong.song)
  reproducedSong: ReproducedSong[];
}
