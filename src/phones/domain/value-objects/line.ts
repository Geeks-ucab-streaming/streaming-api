export class Line {
  static create(id:string,phone:string): Line {
    return new Line(id,phone);
  }
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
