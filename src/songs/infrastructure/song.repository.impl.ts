import { Repository, createQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IGenericRepository } from 'src/common/domain/generic.repository';
import { Song } from '../domain/song';
import { SongEntity } from './entities/song.entity';

export class SongRepository implements IGenericRepository<Song> {
  constructor(
    @InjectRepository(SongEntity)
    private readonly repository: Repository<SongEntity>,
  ) {}

  async findAll(): Promise<Song[]> {
    throw new Error();
  }

  async findById(id: string): Promise<Song> {
    const songResponse = await this.repository
      .createQueryBuilder('song')
      .leftJoinAndSelect('song.song_artist', 'songArtist')
      .leftJoinAndSelect('songArtist.artist', 'artist')
      .addSelect('artist.name')
      .where('song.id = :id', { id })
      .getOne();

    console.log(songResponse);
    console.log('El de arriba');

    let artists: string[] = [];

    songResponse.song_artist.map((artist) => artists.push(artist.artist.name));

    console.log(artists);

    let song = new Song(
      songResponse.id,
      songResponse.name,
      songResponse.duration,
      songResponse.creation_date,
      songResponse.song_reference,
      songResponse.preview_reference,
      songResponse.image_reference,
      songResponse.reproductions,
      songResponse.genres,
      artists,
    );

    return song;
  }
}
