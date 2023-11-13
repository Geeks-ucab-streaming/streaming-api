import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { IGetFileService } from '../../domain/services/getFiles.service.interface';
import {IGenericRepository } from 'src/common/domain/services/services.interface';

@Injectable()
export class GetArtistImageFileService implements IGenericRepository<string, Buffer> {
  readonly azureConnection = process.env.AZURE_STORAGE_CONNECTION_STRING;
  readonly containerName = process.env.ARTISTS_IMAGES_CONTAINER;


  private getBlobClient(filename: string): BlockBlobClient {
    console.log(this.containerName);
    console.log(filename);
    try {
      const blobClientService = BlobServiceClient.fromConnectionString(
        this.azureConnection,
      );
      const containerClient = blobClientService.getContainerClient(
        this.containerName,
      );

      const blobClient = containerClient.getBlockBlobClient(filename);
      return blobClient;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  private async readableStreamBodyToBuffer(
    stream: NodeJS.ReadableStream,
  ): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      stream.on('data', (chunk: Uint8Array) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', (error) => reject(error));
    });
  }

  async execute(filename: string): Promise<Buffer> {
    //console.log('llegó aquí');
    try {
      const blobClient = this.getBlobClient(filename);
      //console.log(filename);
      const blobDownloaded = await blobClient.download();
      const buffer = await this.readableStreamBodyToBuffer(
        blobDownloaded.readableStreamBody,
      );
      return buffer;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}
