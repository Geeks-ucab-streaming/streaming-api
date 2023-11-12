export class Artist {
  id: string;
  name: string;
  duration: string;
  image_reference: string;

  constructor(
    id: string,
    name: string,
    duration: string,
    image_reference: string,
  ) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.image_reference = image_reference;
  }
}
