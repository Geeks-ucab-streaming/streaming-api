import { Artist } from "../artist";

export class InvalidArtistNameException extends DomainException<Artist> {
    
    constructor(artist: Artist) {
        super(artist, 'Invalid Name', 'InvalidArtistNameException', 400);
    }
}
