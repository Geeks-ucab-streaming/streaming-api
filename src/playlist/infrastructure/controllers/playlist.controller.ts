import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindAlbumByArtistIDService } from 'src/playlist/application/services/FindAlbumsByArtistID.service';
import { FindAlbumByPlaylistIDService } from 'src/playlist/application/services/FindAlbumByPlaylistID.service';
import { Playlist } from 'src/playlist/domain/playlist';
import { PlaylistRepository } from '../PlaylistRepository.impl';
import { DataSourceSingleton } from 'src/common/infrastructure/dataSourceSingleton';
import { ApiTags } from '@nestjs/swagger';
import { OrmSongRepository } from 'src/songs/infrastructure/repositories/song.repository.impl';
import { FindTopPlaylistsService } from 'src/playlist/application/services/FindTopPlaylists.service';
import { PlaylistDto, SongDto, TopPlaylistDto } from 'src/dtos';
import { Artist } from 'src/artists/domain/artist';
import { GetSongsInCollectionService } from 'src/songs/application/services/getSongsInCollection.service';
import { Song } from 'src/songs/domain/song';
import { FindArtistsInCollectionService } from 'src/artists/application/services/FindArtistsInCollection.service';
import { OrmArtistRepository } from 'src/artists/infrastructure/repositories/artist.repository.impl';
import { Result } from '../../../common/domain/logic/Result';

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
  @Get('/top_playlist')
  async findTopPlaylists(): Promise<TopPlaylistDto> {
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

      return topPlaylistsInfo;
    } else throw new Error(playlistsResponse.Error.message);
  }

  @ApiTags('Playlist')
  @Get('/FindByArtistID/:id')
  async findByArtistId(@Param('id') id: string): Promise<Playlist[]> {
    this.findPlaylistByArtistIdService = new FindAlbumByArtistIDService(
      this.repository,
      this.songRepository,
    );
    return (await this.findPlaylistByArtistIdService.execute(id)).Value;
  }
  @ApiTags('Playlist')
  @Get(':id')
  async findById(@Param('id') id: string): Promise<PlaylistDto> {
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
    const playlistResult: Result<Playlist> =
      await this.findPlaylistByIdService.execute(id);

    if (playlistResult.IsSuccess) {
      const playlistResponse: Playlist = (
        await this.findPlaylistByIdService.execute(id)
      ).Value;

      let playlistCreators: Artist[] = [];

      if (playlistResponse.IsAlbum)
        playlistCreators = await this.findArtistsInCollectionService.execute(
          playlistResponse.PlaylistCreator,
        );
      console.log(playlistResponse.IsAlbum);

      let creators: { creatorId: string; creatorName: string }[] = [];
      for (const creator of playlistCreators) {
        creators.push({
          creatorId: creator.Id.Value,
          creatorName: creator.Name.Value,
        });
      }
      console.log('=========================');
      console.log(creators);

      let songsId: string[] = [];

      for (const song of playlistResponse.PlaylistSong) {
        songsId.push(song);
      }

      const songs: Song[] =
        await this.findSongsInCollectionService.execute(songsId);

      let playlistSongs: SongDto[] = [];

      for (const song of songs) {
        const artists: Artist[] =
          await this.findArtistsInCollectionService.execute(song.Artists);
        let artistsSong: { id: string; name: string }[] = [];
        for (const artist of artists) {
          artistsSong.push({
            id: artist.Id.Value,
            name: artist.Name.Value,
          });
        }
        playlistSongs.push({
          songId: song.Id.Value.toString(),
          name: song.Name,
          image: song.Image,
          duration: song.DurationString,
          artists: artistsSong,
        });
      }

      const playlist: PlaylistDto = {
        id: playlistResponse.Id.Value,
        name: playlistResponse.Name,
        duration: playlistResponse.DurationString,
        image: playlistResponse.Playlist_Image,
        creators: creators,
        songs: playlistSongs,
      };

      return playlist;
    } else throw new Error(playlistResult.Error.message);
  }
}
