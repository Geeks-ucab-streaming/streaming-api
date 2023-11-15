import { Repository, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { Song } from 'src/songs/domain/song';
import { SongEntity } from '../entities/song.entity';
import { Inject } from '@nestjs/common';
import { Factory } from 'src/common/domain/icreator.interface';

export class SongsByArtistIdRepository
  implements IFindGenericRepository<Song[]>
{
  constructor(
    @InjectRepository(SongEntity)
    private readonly repository: Repository<SongEntity>,
    @Inject('SongFactory')
    private readonly songFactory: Factory<SongEntity, Song>,
  ) {}

  async find(artistId: string): Promise<Song[]> {
    const subquery = await this.repository
      .createQueryBuilder('song')
      .innerJoin(
        'song.song_artist',
        'songArtist',
        'song.id = songArtist.songId',
      )
      .innerJoin('Artists', 'a', 'a.id = songArtist.artistId')
      .where('a.id = :artistId', { artistId })
      .select('song.id')
      .getMany();

    let values = [];
    subquery.forEach((sub) => values.push(sub.id));

    const songsResponse = await this.repository
      .createQueryBuilder('song')
      .innerJoinAndSelect('song.song_artist', 'songArtist')
      .innerJoinAndSelect('songArtist.artist', 'artist')
      .where('song.id IN (:...values)', { values })
      .getMany();

    const songs: Song[] = [];
    songsResponse.forEach((song) =>
      songs.push(this.songFactory.factoryMethod(song)),
    );
    return songs;
  }
}
