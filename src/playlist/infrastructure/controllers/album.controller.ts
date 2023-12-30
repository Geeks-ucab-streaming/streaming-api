import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindAlbumByArtistIDService } from 'src/playlist/application/services/FindAlbumsByArtistID.service';
import { FindAlbumByPlaylistIDService } from 'src/playlist/application/services/FindAlbumByPlaylistID.service';
import { Playlist } from 'src/playlist/domain/playlist';
import { PlaylistRepository } from '../PlaylistRepository.impl';
import { DataSourceSingleton } from 'src/common/infrastructure/dataSourceSingleton';
import { ApiTags } from '@nestjs/swagger';
import { OrmSongRepository } from 'src/songs/infrastructure/repositories/song.repository.impl';
import { FindTopPlaylistsService } from 'src/playlist/application/services/FindTopPlaylists.service';
import { PlaylistDto, SongDto, TopAlbumsDto, TopPlaylistDto } from 'src/dtos';
import { Artist } from 'src/artists/domain/artist';
import { GetSongsInCollectionService } from 'src/songs/application/services/getSongsInCollection.service';
import { Song } from 'src/songs/domain/song';
import { FindArtistsInCollectionService } from 'src/artists/application/services/FindArtistsInCollection.service';
import { OrmArtistRepository } from 'src/artists/infrastructure/repositories/artist.repository.impl';
import { FindTopAlbumsService } from 'src/playlist/application/services/FindTopAlbums.service';
import { Result } from 'src/common/domain/logic/Result';

@Controller('api/album')
export class AlbumController {
  private repository: PlaylistRepository;
  private songRepository: OrmSongRepository;
  private artistsRepository: OrmArtistRepository;
  private findPlaylistByIdService: FindAlbumByPlaylistIDService;
  private findPlaylistByArtistIdService: FindAlbumByArtistIDService;
  private findTopAlbumsService: FindTopAlbumsService;
  private findSongsInCollectionService: GetSongsInCollectionService;
  private findArtistsInCollectionService: FindArtistsInCollectionService;

  constructor() {
    this.repository = new PlaylistRepository(DataSourceSingleton.getInstance());
    this.songRepository = new OrmSongRepository(
      DataSourceSingleton.getInstance(),
    );
    this.artistsRepository = new OrmArtistRepository(
      DataSourceSingleton.getInstance(),
    );
  }

  @ApiTags('TopAlbum')
  @Get('/top_album')
  async findTopAlbums(): Promise<TopPlaylistDto> {
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

      return topAlbumsInfo;
    } else throw new Error(albumsResult.Error.message);
  }
}
