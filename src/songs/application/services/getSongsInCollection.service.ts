import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { DomainException } from 'src/common/domain/exceptions/domain-exception';
import { IFindService } from 'src/common/domain/ifind.service';
import { Result } from 'src/common/domain/logic/Result';
import { ISongRepository } from 'src/songs/domain/ISongRepository';
import { Song } from 'src/songs/domain/song';

export class GetSongsInCollectionService
  implements IApplicationService<String[], Song[]>
{
  constructor(private readonly songsRepository: ISongRepository) {}
  get name(): string {
    return this.constructor.name;
  }

  async execute(songsId: string[]): Promise<Result<Song[]>> {
    const res = await this.songsRepository.findSongsInCollection(songsId);
    if (res) return Result.success(res);
    return Result.fail(
      new DomainException(
        void 0,
        `No se encontró ninguna canción con los ids suministrados`,
        'Not Found Exception',
        404,
      ),
    );
  }
}
