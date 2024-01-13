import { Controller, Get, Param } from '@nestjs/common';
import { Playlist } from 'src/playlist/domain/playlist';
import { PlaylistRepository } from '../PlaylistRepository.impl';
import { DataSourceSingleton } from 'src/common/infrastructure/dataSourceSingleton';
import { ApiTags } from '@nestjs/swagger';
import { OrmSongRepository } from 'src/songs/infrastructure/repositories/song.repository.impl';
import { PlaylistDto, SongDto, TopAlbumsDto, TopPlaylistDto } from 'src/dtos';
import { FindTopAlbumsService } from 'src/playlist/application/services/FindTopAlbums.service';
import { Result } from 'src/common/domain/logic/Result';
import { MyResponse } from 'src/common/infrastructure/Response';
import { FindAlbumByPlaylistIDService } from 'src/playlist/application/services/FindPlaylistByID.service';
import { GetSongsInCollectionService } from 'src/songs/application/services/getSongsInCollection.service';
import { FindArtistsInCollectionService } from 'src/artists/application/services/FindArtistsInCollection.service';
import { OrmArtistRepository } from 'src/artists/infrastructure/repositories/artist.repository.impl';
import { Artist } from 'src/artists/domain/artist';
import { Song } from 'src/songs/domain/song';
import { FindAlbumByIDService } from 'src/playlist/application/services/FindAlbumByID.service';

@Controller('api/album')
export class AlbumController {
  private repository: PlaylistRepository;
  private songRepository: OrmSongRepository;
  private artistsRepository: OrmArtistRepository;
  private findTopAlbumsService: FindTopAlbumsService;
  private findAlbumByIDService: FindAlbumByIDService;
  private findPlaylistByIdService: FindAlbumByPlaylistIDService;
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
  @Get('/top_albums')
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
  @ApiTags('Album')
  @Get(':id')
  async findById(@Param('id') id: string): Promise<MyResponse<PlaylistDto>> {
    this.findAlbumByIDService = new FindAlbumByIDService(
      this.repository,
      this.songRepository,
    );
    this.findArtistsInCollectionService = new FindArtistsInCollectionService(
      this.artistsRepository,
    );
    this.findSongsInCollectionService = new GetSongsInCollectionService(
      this.songRepository,
    );
    const AlbumResult: Result<Playlist> =
      await this.findAlbumByIDService.execute(id);

    if (AlbumResult.IsSuccess) {
      const albumResponse: Playlist = AlbumResult.Value;
      let playlistCreators: Artist[] = [];
      let creators: { creatorId: string; creatorName: string }[] = [];

      console.log(this.artistsRepository);

      const playlistCreatorsResponse: Result<Artist[]> =
        await this.findArtistsInCollectionService.execute(
          albumResponse.PlaylistCreator,
        );
      if (playlistCreatorsResponse.IsSuccess) {
        playlistCreators = playlistCreatorsResponse.Value;
        console.log(albumResponse.IsAlbum);

        for (const creator of playlistCreators) {
          creators.push({
            creatorId: creator.Id.Value,
            creatorName: creator.Name.Value,
          });
        }
      } else
        MyResponse.fail(
          playlistCreatorsResponse.statusCode,
          playlistCreatorsResponse.message,
          playlistCreatorsResponse.error,
        );

      let songsId: string[] = [];

      for (const song of albumResponse.PlaylistSong) {
        songsId.push(song);
      }

      const songsResponse: Result<Song[]> =
        await this.findSongsInCollectionService.execute(songsId);

      let playlistSongs: SongDto[] = [];
      if (songsResponse.IsSuccess) {
        const songs: Song[] = songsResponse.Value;
        for (const song of songs) {
          const artistsResponse: Result<Artist[]> =
            await this.findArtistsInCollectionService.execute(song.Artists);
          let artists: Artist[] = [];

          if (artistsResponse.IsSuccess) {
            artists = artistsResponse.Value;
          } else
            MyResponse.fail(
              artistsResponse.statusCode,
              artistsResponse.message,
              artistsResponse.error,
            );

          let artistsSong: { id: string; name: string }[] = [];
          for (const artist of artists) {
            artistsSong.push({
              id: artist.Id.Value,
              name: artist.Name.Value,
            });
          }
          playlistSongs.push({
            id: song.Id.Value.toString(),
            name: song.Name,
            image: song.Image,
            duration: song.DurationString,
            artists: artistsSong,
          });
        }
      } else
        MyResponse.fail(
          songsResponse.statusCode,
          songsResponse.message,
          songsResponse.error,
        );

      const playlist: PlaylistDto = {
        id: albumResponse.Id.Value,
        name: albumResponse.Name,
        duration: albumResponse.DurationString,
        image: albumResponse.Playlist_Image,
        streams: albumResponse.Streams,
        creators: creators,
        songs: playlistSongs,
      };
      return MyResponse.success(playlist);
    } else
      MyResponse.fail(
        AlbumResult.statusCode,
        AlbumResult.message,
        AlbumResult.error,
      );
  }
}
