import { IFindService } from 'src/common/domain/ifind.service';
import { Song } from 'src/songs/domain/song';
import { ISongRepository } from 'src/songs/domain/ISongRepository';
import { Artist } from 'src/artists/domain/artist';
import { IArtistsRepository } from 'src/artists/domain/IArtistsRepository';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';
import { SongID } from 'src/songs/domain/value-objects/SongID-valueobject';
export interface GetSongByIdServiceDto {
  id?: string;
}
export class GetSongByIdService
  implements IApplicationService<GetSongByIdServiceDto, Song>
{
  get name(): string {
    return this.constructor.name;
  }
  constructor(private readonly songsRepository: ISongRepository) {}

  async execute(dto?: GetSongByIdServiceDto): Promise<Result<Song>> {
    const song = await this.songsRepository.findById(dto.id);
    if (song) return Result.success<Song>(song);
    return Result.fail<Song>(
      new Error(`No se encontró la canción de ID: ${dto.id}`),
    );
  }
}
