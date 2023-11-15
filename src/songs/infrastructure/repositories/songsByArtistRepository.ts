import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IGenericRepository } from 'src/common/domain/generic.repository';
import { Song } from 'src/songs/domain/song';
import { SongEntity } from '../entities/song.entity';

export class SongsByArtistIdRepository implements IGenericRepository<Song> {
  constructor(
    @InjectRepository(SongEntity)
    private readonly repository: Repository<SongEntity>,
  ) {}

  findAll(): Promise<Song[]> {
    throw new Error('Method not implemented.');
  }

  async findById(artistid: string): Promise<Song> {
    const songsResponse = await this.repository
      .createQueryBuilder('song')
      .leftJoinAndSelect('song.song_artist', 'song_artist')
      .where('song_artist.artist.id = :artistId', { artistId: artistid })
      .getMany();
    console.log(songsResponse);
    return;
  }
}
