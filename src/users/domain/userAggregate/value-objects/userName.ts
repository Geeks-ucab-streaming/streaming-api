export class userName {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getValue(): string {
    return this.name;
  }

  public equals(username: userName): boolean {
    return this.name === username.getValue();
  }

}