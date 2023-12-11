import { DomainEvent } from "src/common/domain/Event/domain-event";
import { ArtistID } from "../value-objects/artistID-valueobject";
import { ArtistName } from "../value-objects/artistName-valueobject";
import { ArtistImage } from "../value-objects/artistImage-valueobject";

export class ArtistCreatedEvent extends DomainEvent {
    protected constructor(
        public id:ArtistID, 
        public name: ArtistName, 
        public image_reference:ArtistImage
        ) {
        super();
    }

    public static create(
        id:ArtistID, 
        name: ArtistName, 
        image_reference:ArtistImage
        ): ArtistCreatedEvent {
        return new ArtistCreatedEvent(id, name, image_reference);
    }
}