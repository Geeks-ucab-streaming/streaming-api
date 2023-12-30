export class Optional<T> {
  value: T | undefined;
  assigned: boolean;

  constructor(value?: T) {
    if (value) {
      this.value = value;
      this.assigned = true;
    } else {
      this.value = undefined;
      this.assigned = false;
    }
  }

  hasValue(): boolean {
    return this.assigned;
  }

  getValue(): T {
    if (!this.assigned) throw Error();
    return <T>this.value;
  }
}
