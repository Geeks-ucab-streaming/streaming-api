import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';
import { IStreamRepository } from 'src/common/domain/repositories/IStreamRepository';

export class streamDto {
  user: string;
  song: string;
  playlist?: string;
}

export class AddStreamToSongService
  implements IApplicationService<streamDto, void>
{
  private readonly streamsRepository: IStreamRepository;
  constructor(streamsRepository: IStreamRepository) {
    this.streamsRepository = streamsRepository;
  }
  get name(): string {
    return this.constructor.name;
  }
  async execute(dto: streamDto): Promise<Result<void>> {
    await this.streamsRepository.saveSongStream(dto.user, dto.song);
    return;
  }
}
