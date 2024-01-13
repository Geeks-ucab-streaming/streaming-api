import { Controller, Get } from '@nestjs/common';
import { Playlist } from 'src/playlist/domain/playlist';
import { PlaylistRepository } from '../PlaylistRepository.impl';
import { DataSourceSingleton } from 'src/common/infrastructure/dataSourceSingleton';
import { ApiTags } from '@nestjs/swagger';
import { OrmSongRepository } from 'src/songs/infrastructure/repositories/song.repository.impl';
import { TopAlbumsDto, TopPlaylistDto } from 'src/dtos';
import { FindTopAlbumsService } from 'src/playlist/application/services/FindTopAlbums.service';
import { Result } from 'src/common/domain/logic/Result';
import { MyResponse } from 'src/common/infrastructure/Response';

@Controller('api/album')
export class AlbumController {
  private repository: PlaylistRepository;
  private songRepository: OrmSongRepository;
  private findTopAlbumsService: FindTopAlbumsService;

  constructor() {
    this.repository = new PlaylistRepository(DataSourceSingleton.getInstance());
    this.songRepository = new OrmSongRepository(
      DataSourceSingleton.getInstance(),
    );
  }

  @ApiTags('TopAlbum')
  @Get('/top_album')
  async findTopAlbums(): Promise<MyResponse<TopPlaylistDto>> {
    this.findTopAlbumsService = new FindTopAlbumsService(
      this.repository,
      this.songRepository,
    );
    let topAlbumsInfo: TopAlbumsDto = {
      playlists: [],
    };
    const albumsResult: Result<Playlist[]> =
      await this.findTopAlbumsService.execute();
    if (albumsResult.IsSuccess) {
      const albumsResponse: Playlist[] = albumsResult.Value;
      for (const album of albumsResponse) {
        topAlbumsInfo.playlists.push({
          id: album.Id.Value,
          image: album.Playlist_Image,
        });
      }

      return MyResponse.success(topAlbumsInfo);
    } else
      MyResponse.fail(
        albumsResult.statusCode,
        albumsResult.message,
        albumsResult.error,
      );
  }
}
