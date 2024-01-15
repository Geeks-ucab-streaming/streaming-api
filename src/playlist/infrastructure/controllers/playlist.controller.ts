<<<<<<< HEAD
import { Controller, Get, Inject, Param, ParseUUIDPipe } from '@nestjs/common';
import { FindAlbumByArtistIDService } from 'src/playlist/application/services/FindAlbumsByArtistID.service';
import { FindAlbumByPlaylistIDService } from 'src/playlist/application/services/FindPlaylistByID.service';
=======
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindAlbumByArtistIDService, FindAlbumByArtistIDServiceDto } from 'src/playlist/application/services/FindAlbumsByArtistID.service';
import {
  FindAlbumByPlaylistIDService,
  FindAlbumByPlaylistIDServiceDto,
} from 'src/playlist/application/services/FindPlaylistByID.service';
>>>>>>> 8ab093539330a29c38b0de1f9c76d23e3b451fe6
import { Playlist } from 'src/playlist/domain/playlist';
import { PlaylistRepository } from '../PlaylistRepository.impl';
import { DataSourceSingleton } from 'src/common/infrastructure/dataSourceSingleton';
import { ApiTags } from '@nestjs/swagger';
import { OrmSongRepository } from 'src/songs/infrastructure/repositories/song.repository.impl';
import { FindTopPlaylistsService } from 'src/playlist/application/services/FindTopPlaylists.service';
import { PlaylistDto, SongDto, TopPlaylistDto } from 'src/dtos';
import { Artist } from 'src/artists/domain/artist';
import {
  GetSongsInCollectionService,
  GetSongsInCollectionServiceDto,
} from 'src/songs/application/services/getSongsInCollection.service';
import { Song } from 'src/songs/domain/song';
import { FindArtistsInCollectionService } from 'src/artists/application/services/FindArtistsInCollection.service';
import { OrmArtistRepository } from 'src/artists/infrastructure/repositories/artist.repository.impl';
import { Result } from '../../../common/domain/logic/Result';
import { MyResponse } from 'src/common/infrastructure/Response';
import { SongID } from 'src/songs/domain/value-objects/SongID-valueobject';
import { PlaylistID } from 'src/playlist/domain/value-objects/PlaylistID-valueobject';
import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';

@Controller('api/playlist')
export class PlaylistController {
  private repository: PlaylistRepository;
  private songRepository: OrmSongRepository;
  private artistsRepository: OrmArtistRepository;
  private findPlaylistByIdService: FindAlbumByPlaylistIDService;
  private findPlaylistByArtistIdService: FindAlbumByArtistIDService;
  private findTopPlaylistsService: FindTopPlaylistsService;
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

  @ApiTags('TopPlaylist')
  @Get('/top_playlists')
  async findTopPlaylists(): Promise<MyResponse<TopPlaylistDto>> {
    this.findTopPlaylistsService = new FindTopPlaylistsService(
      this.repository,
      this.songRepository,
    );
    let topPlaylistsInfo: TopPlaylistDto = {
      playlists: [],
    };
    const playlistsResponse: Result<Playlist[]> =
      await this.findTopPlaylistsService.execute();
    if (playlistsResponse.IsSuccess) {
      const playlistsResult: Playlist[] = (
        await this.findTopPlaylistsService.execute()
      ).Value;

      for (const playlist of playlistsResult) {
        topPlaylistsInfo.playlists.push({
          id: playlist.Id.Value,
          image: playlist.Playlist_Image,
        });
      }

      return MyResponse.success(topPlaylistsInfo);
    } else
      MyResponse.fail(
        playlistsResponse.statusCode,
        playlistsResponse.message,
        playlistsResponse.error,
      );
  }

  @ApiTags('Playlist')
  @Get('/FindByArtistID/:id')
  async findByArtistId(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<MyResponse<Playlist[]>> {
    this.findPlaylistByArtistIdService = new FindAlbumByArtistIDService(
      this.repository,
      this.songRepository,
    );
    const iddto = ArtistID.create(id);
    const dto: FindAlbumByArtistIDServiceDto = { id: iddto };
    const response = await this.findPlaylistByArtistIdService.execute(dto);
    if (response.IsSuccess) {
      return MyResponse.fromResult(response);
    }
    MyResponse.fail(response.statusCode, response.message, response.error);
  }
  @ApiTags('Playlist')
  @Get(':id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<MyResponse<PlaylistDto>> {
    this.findPlaylistByIdService = new FindAlbumByPlaylistIDService(
      this.repository,
      this.songRepository,
    );
    this.findArtistsInCollectionService = new FindArtistsInCollectionService(
      this.artistsRepository,
    );
    this.findSongsInCollectionService = new GetSongsInCollectionService(
      this.songRepository,
    );
    const iddto=PlaylistID.create(id);
    const dto: FindAlbumByPlaylistIDServiceDto = { id: iddto };

    const playlistResult: Result<Playlist> =
      await this.findPlaylistByIdService.execute(dto);

    if (playlistResult.IsSuccess) {
      const playlistResponse: Playlist = (
        await this.findPlaylistByIdService.execute(dto)
      ).Value;
      let playlistCreators: Artist[] = [];
      let creators: { creatorId: string; creatorName: string }[] = [];

      if (playlistResponse.IsAlbum) {
        const playlistCreatorsResponse: Result<Artist[]> =
          await this.findArtistsInCollectionService.execute(
            playlistResponse.PlaylistCreator,
          );
        if (playlistCreatorsResponse.IsSuccess) {
          playlistCreators = playlistCreatorsResponse.Value;
          console.log(playlistResponse.IsAlbum);

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
      }

      let songsId: SongID[] = [];

      for (const song of playlistResponse.PlaylistSong) {
        songsId.push(song);
      }

      const findSongsInCollectionDto: GetSongsInCollectionServiceDto = {
        songsId,
      };

      const songsResponse: Result<Song[]> =
        await this.findSongsInCollectionService.execute(
          findSongsInCollectionDto,
        );

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
        id: playlistResponse.Id.Value,
        name: playlistResponse.Name,
        duration: playlistResponse.DurationString,
        image: playlistResponse.Playlist_Image,
        streams: playlistResponse.Streams,
        creators: creators,
        songs: playlistSongs,
      };
      return MyResponse.success(playlist);
    } else
      MyResponse.fail(
        playlistResult.statusCode,
        playlistResult.message,
        playlistResult.error,
      );
  }
}
