import { DomainEvent } from "src/common/domain/Event/domain-event";
import { PlaylistID } from "../value-objects/PlaylistID-valueobject";
import { PlaylistName } from "../value-objects/PlaylistName-valueobject";
import { PlaylistDuration } from "../value-objects/PlaylistDuration-valueobject";
import { PlaylistImageReference } from "../value-objects/PlaylistImageReference-valueobject";
import { PlaylistStreams } from "../value-objects/PlaylistStreams-valueobject";
import { Artist } from "src/artists/domain/artist";
import { ArtistID } from "src/artists/domain/value-objects/artistID-valueobject";
import { SongID } from "src/songs/domain/value-objects/SongID-valueobject";

export class PlaylistCreatedEvent extends DomainEvent {
  protected constructor(
    public id: PlaylistID,
    public name: PlaylistName,
    public duration: PlaylistDuration,
    public image_reference: PlaylistImageReference,
    public streams: PlaylistStreams,
    public isAlbum: boolean,
    public playlist_Image: Buffer | null,
    public playlistCreator?: ArtistID[],
    public playlistSong?: SongID[],
  ) {
    super();
  }

  public static create(
    id: PlaylistID,
    name: PlaylistName,
    duration: PlaylistDuration,
    image_reference: PlaylistImageReference,
    streams: PlaylistStreams,
    isAlbum: boolean,
    playlist_Image: Buffer | null,
    playlistCreator?: ArtistID[],
    playlistSong?: SongID[],
  ): PlaylistCreatedEvent {
    return new PlaylistCreatedEvent(
      id,
      name,
      duration,
      image_reference,
      streams,
      isAlbum,
      playlist_Image,
      playlistCreator,
      playlistSong,
    );
  }
}