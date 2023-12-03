export abstract class DomainException extends Error {
    public readonly errorCode: string;
    public readonly httpStatus: number;
  
    constructor(message: string, errorCode: string, httpStatus: number) {
      super(message);
      this.errorCode = errorCode;
      this.httpStatus = httpStatus;
      Object.setPrototypeOf(this, new.target.prototype); // Asegura que la instancia sea de la subclase
    }
  }
  