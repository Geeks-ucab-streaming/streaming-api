export class Song {
  id: string;
  name: string;
  duration: string;
  creation_date: Date;
  song_reference: string;
  preview_reference: string;
  image_reference: string;
  reproductions: number;
  genres: string[];
  artistId: number;
  songImage: Buffer | null;
  song: Buffer | null;
  preview: Buffer | null;

  constructor(
    id: string,
    name: string,
    duration: string,
    creation_date: Date,
    song_reference: string,
    preview_reference: string,
    image_reference: string,
    reproductions: number,
    genres: string[],
    artistId: number,
  ) {
    this.name = name;
    this.duration = duration;
    this.creation_date = creation_date;
    this.song_reference = song_reference;
    this.preview_reference = preview_reference;
    this.image_reference = image_reference;
    this.reproductions = reproductions;
    this.genres = genres;
    this.artistId = artistId;
  }
}
