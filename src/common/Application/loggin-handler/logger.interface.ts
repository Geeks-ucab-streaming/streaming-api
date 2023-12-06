export interface ILogger {
  /**Permite logguear información.
   * @param message DTO a logguear */
  log(origin: string, message: string): void;
}
