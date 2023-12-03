import { Artist } from "src/artists/domain/artist";
import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { IArtistRepository } from "../repositories/artist.repository.interface";
import { Result } from "src/common/domain/logic/Result";
import { ArtistID } from "src/artists/domain/value-objects/artistID-valueobject";

export interface GetArtistProfilesApplicationServiceDto{
    id?: string;
}
export class GetArtistProfilesApplicationServiceResultDto implements IApplicationService<GetArtistProfilesApplicationServiceDto, Artist>{
    get name(): string { return this.constructor.name; }
    constructor(private readonly artistRepository: IArtistRepository) {}

    async execute(dto?: GetArtistProfilesApplicationServiceDto): Promise<Result<Artist>>{
        const artist = await this.artistRepository.findOneById(ArtistID.create(dto.id));
        return Result.success<Artist>(artist);
    }

  
}