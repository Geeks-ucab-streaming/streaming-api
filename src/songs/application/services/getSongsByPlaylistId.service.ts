import { IFindService } from 'src/common/domain/ifind.service';
import { Song } from 'src/songs/domain/song';
import { ISongRepository } from 'src/songs/domain/ISongRepository';
import { Result } from 'src/common/domain/logic/Result';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { DomainException } from 'src/common/domain/exceptions/domain-exception';
import { PlaylistID } from 'src/playlist/domain/value-objects/PlaylistID-valueobject';

export interface GetSongBPlaylistIdServiceDto {
  id: PlaylistID;
}

export class GetSongBPlaylistIdService
  implements IApplicationService<GetSongBPlaylistIdServiceDto, Song[]>
{
  constructor(private readonly songsRepository: ISongRepository) {}
  get name(): string {
    return this.constructor.name;
  }

  async execute(dto: GetSongBPlaylistIdServiceDto): Promise<Result<Song[]>> {
    const res: Song[] = await this.songsRepository.findByPlaylistId(dto.id);
    if (res) return Result.success(res);
    return Result.fail(
      new DomainException(
        void 0,
        `No se encontró ninguna canción para la playlist de id: ${dto.id.Value}`,
        'Not Found Exception',
        404,
      ),
    );
  }
}
