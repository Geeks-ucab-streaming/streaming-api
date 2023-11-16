import { Module } from "@nestjs/common";
import { PlaylistEntity } from "./entities/playlist.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlaylistController } from "./controllers/playlist.controller";
import { FindAlbumByArtistIDService } from "../application/dtos/services/FindAlbumByArtistID";
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { GetFileService } from "src/common/infrastructure/services/getFile.service";
import { PlaylistRepository } from "./Playlist.repository";

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity])],
  providers: [
    {
      provide: 'PlaylistRepository',
      useClass: PlaylistRepository,
    },
    {
      provide: 'FindOnePlaylistService',
      useClass: FindAlbumByArtistIDService,
    },
    {
      provide: 'GetAlbumImageService',
      useFactory: () => {
        return new GetFileService(process.env.SONG_ALBUM_PLAYLIST_CONTAINER);
      },
    },
  ],
  controllers: [PlaylistController],
})
export class PlaylistModule {}