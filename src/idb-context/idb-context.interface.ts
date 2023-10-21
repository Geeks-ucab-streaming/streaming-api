export interface IdbContext {
  connect(): void;
  drop(): void;
  disconnect(): void;
}

export interface IdbContextOperations extends IdbContext {
  create(): void;
  update(): void;
  delete(): void;
}
