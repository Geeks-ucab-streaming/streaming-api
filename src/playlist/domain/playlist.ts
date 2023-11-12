export class Playlist {
  id: string;
  name: string;
  duration: string;
  image_reference: string;
  reproductions: number;

  constructor(
    id: string,
    name: string,
    duration: string,
    image_reference: string,
    reproductions: number,
  ) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.image_reference = image_reference;
    this.reproductions = reproductions;
  }
}
