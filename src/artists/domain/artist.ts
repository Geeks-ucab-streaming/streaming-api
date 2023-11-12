export class Artist {
  id: string;
  name: string;
  image_reference: string;

  constructor(id: string, name: string, image_reference: string) {
    this.id = id;
    this.name = name;
    this.image_reference = image_reference;
  }
}
