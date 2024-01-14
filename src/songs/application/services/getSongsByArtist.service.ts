import { IFindService } from 'src/common/domain/ifind.service';
import { Song } from 'src/songs/domain/song';
import { ISongRepository } from 'src/songs/domain/ISongRepository';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';
import { DomainException } from 'src/common/domain/exceptions/domain-exception';
import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';

export interface FindSongsByArtistIdServiceDto {
  id: ArtistID;
}

export class FindSongsByArtistIdService
  implements IApplicationService<FindSongsByArtistIdServiceDto, Song[]>
{
  constructor(private readonly songsRepository: ISongRepository) {}

  get name(): string {
    return this.constructor.name;
  }

  async execute(dto: FindSongsByArtistIdServiceDto): Promise<Result<Song[]>> {
    const songs: Song[] = await this.songsRepository.findByArtistId(dto.id);
    if (songs) return Result.success<Song[]>(songs);
    return Result.fail(
      new DomainException(
        void 0,
        `No se encontró ninguna canción por el id de artista: ${dto.id.Value}`,
        'Not Found Exception',
        404,
      ),
    );
  }
}
