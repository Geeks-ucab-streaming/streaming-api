import { Injectable } from '@nestjs/common';
import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { DomainException } from 'src/common/domain/exceptions/domain-exception';
import { Result } from 'src/common/domain/logic/Result';
import { IPlaylistRepository } from 'src/playlist/domain/IPlaylistRepository';
import { Playlist } from 'src/playlist/domain/playlist';
import { CalculatePlaylistDurationService } from 'src/playlist/domain/services/calculatePlaylistDuration.service';
import { ISongRepository } from 'src/songs/domain/ISongRepository';
export interface FindAlbumByArtistIDServiceDto {
  id?: ArtistID;
}
@Injectable()
export class FindAlbumByArtistIDService
  implements IApplicationService<FindAlbumByArtistIDServiceDto, Playlist[]>
{
  private readonly calculateDurationService: CalculatePlaylistDurationService =
    CalculatePlaylistDurationService.getInstance();
  constructor(
    private readonly albumRepository: IPlaylistRepository,
    private readonly songRepository: ISongRepository,
  ) {}

  get name(): string {
    return this.constructor.name;
  }

  async execute(
    dto: FindAlbumByArtistIDServiceDto,
  ): Promise<Result<Playlist[]>> {
    const response: Playlist[] =
      await this.albumRepository.findPlaylistsByArtistId(ArtistID.create(dto.id.Value));
    if (response) {
      const playlists: Playlist[] = response;
      for (const playlist of playlists) {
        await this.calculateDurationService.execute(
          playlist,
          this.songRepository,
        );
      }
      return Result.success<Playlist[]>(playlists);
    }
    return Result.fail(
      new DomainException(
        void 0,
        `No se encontró ningún album para el id de artista: ${dto.id.Value}`,
        'Not Found Exception',
        404,
      ),
    );
  }
}
