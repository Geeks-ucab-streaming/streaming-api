import { Controller, Get, Inject, Param } from '@nestjs/common';
import { GetSongByIdService } from '../../application/services/getSongById.service';
import { Song } from 'src/songs/domain/song';
import { FindSongsByArtistIdService } from '../../application/services/getSongsByArtist.service';
import { EntityManager } from 'typeorm';
import { OrmSongRepository } from '../repositories/song.repository.impl';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';

@Controller('songs')
export class SongsController {
  private readonly getSongByIdService: GetSongByIdService;
  private readonly findSongsByArtistIdService: FindSongsByArtistIdService;
  private readonly ormSongRepository: OrmSongRepository;
  // private readonly findSongsByArtistIdService: FindSongsByPlaylistIdService;
  constructor(private readonly manager: EntityManager) {
    if (!manager) {
      throw new Error("Entity manager can't be null.");
    }

    this.ormSongRepository =
      this.manager.getCustomRepository(OrmSongRepository);

    this.getSongByIdService = new GetSongByIdService(
      this.ormSongRepository,
      new GetFileService(process.env.SONG_ALBUM_PLAYLIST_CONTAINER),
    );

    this.findSongsByArtistIdService = new FindSongsByArtistIdService(
      this.ormSongRepository,
      new GetFileService(process.env.SONG_ALBUM_PLAYLIST_CONTAINER),
    );
  }

  // @Get()
  // findAll(): Promise<Artist[]> {
  //   return this.findAllArtistService.execute();
  // }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Song> {
    return await this.getSongByIdService.execute(id);
  }

  @Get('/artist/:artistId')
  findByArtistId(@Param('artistId') id: string): Promise<Song[]> {
    return this.findSongsByArtistIdService.execute(id);
  }
}
