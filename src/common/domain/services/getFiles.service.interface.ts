export interface IGetFileService {
  execute(file: string): Promise<Buffer>;
}
