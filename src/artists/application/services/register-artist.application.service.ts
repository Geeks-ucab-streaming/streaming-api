import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { Result } from "src/common/domain/logic/Result";
import { IUUIDGenerator } from "src/common/domain/uuid-generator.interface";
import { IArtistRepository } from "../repositories/artist.repository.interface";
import { Artist } from "src/artists/domain/artist";
import { ArtistName } from "src/artists/domain/value-objects/artistName-valueobject";
import { ArtistID } from "src/artists/domain/value-objects/artistID-valueobject";
import { ArtistImage } from "src/artists/domain/value-objects/artistImage-valueobject";
import { IEventHandler } from "src/common/Application/event-handler/event-handler.interface";

export interface RegisterArtistApplicationServiceDto{
    name: string;
    image_reference: string;
}

export class RegisterArtistApplicationService implements IApplicationService<RegisterArtistApplicationServiceDto, string>{
    get name(): string { return this.constructor.name; }
    constructor(
        private readonly eventHandler: IEventHandler,
        private readonly uuidGenerator: IUUIDGenerator,
        private readonly artistRepository: IArtistRepository,
    ) {}

    async execute(dto: RegisterArtistApplicationServiceDto): Promise<Result<string>>{

        //creamos el artista
        const artist = Artist.create(
            ArtistID.create(this.uuidGenerator.generate()),
            ArtistName.create(dto.name),
            ArtistImage.create(dto.image_reference),
        );
        
        //Hacemos persistente el artista
        this.artistRepository.saveAggregate(artist);

        //Publicamos los eventos
        this.eventHandler.publish(artist.pullEvents());

        //Retornamos
        return Result.success("Artista registrado exitosamente");
    }}