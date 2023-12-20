import { ArtistID } from "src/artists/domain/value-objects/artistID-valueobject";
import { DomainEvent } from "src/common/domain/Event/domain-event";
import { SongAudioReference } from "../value-objects/SongAudioReference-valueobject";
import { SongCreationDate } from "../value-objects/SongCreationDate-valueobject";
import { SongDuration } from "../value-objects/SongDuration-valueobject";
import { SongID } from "../value-objects/SongID-valueobject";
import { SongImageReference } from "../value-objects/SongImageReference-valueobject";
import { SongName } from "../value-objects/SongName-valueobject";
import { SongStreams } from "../value-objects/SongStreams-valueobject";

export class SongCreatedEvent extends DomainEvent {

    protected constructor(
        public id: SongID,
        public name: SongName,
        public duration: SongDuration,
        public creation_date: SongCreationDate,
        public songAudio_reference: SongAudioReference,
        public image_reference: SongImageReference,
        public streams: SongStreams,
        public genres: string[],
        public artists: ArtistID[],
    ) {
        super();
    }

    public static create(
        id: SongID,
        name: SongName,
        duration: SongDuration,
        creation_date: SongCreationDate,
        songAudio_reference: SongAudioReference,
        image_reference: SongImageReference,
        streams: SongStreams,
        genres: string[],
        artists: ArtistID[],
    ): SongCreatedEvent {
        return new SongCreatedEvent(id, name, duration, creation_date, songAudio_reference, image_reference, streams, genres, artists);
    } 
}