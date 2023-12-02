import { Inject, Injectable } from '@nestjs/common';
import { IFindService } from 'src/common/domain/ifind.service';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { IPlaylistRepository } from 'src/playlist/domain/IPlaylistRepository';
import { Playlist } from 'src/playlist/domain/playlist';

@Injectable()
export class FindAlbumByPlaylistIDService
  implements IFindService<string, Playlist>
{
  private readonly repository: IPlaylistRepository;
  constructor(
    repository: IPlaylistRepository,
    // @Inject('FindAlbumByPlaylistIDRepository')
    // private readonly albumRepository: IFindGenericRepository<Playlist>,
    // @Inject('GetAlbumImageService2')
    // private readonly getFileService: IFindService<string, Buffer>,
    // @Inject('GetArtistImageService')
    // private readonly getFileService2: IFindService<string, Buffer>,
  ) {
    this.repository = repository;
  }

  async execute(id: string): Promise<Playlist> {
    return await this.repository.findPlaylistById(id);
    // const result = await this.repository.findPlaylistById(id);
    // const album = Array.isArray(result) ? result[0] : result;
    // if (!album) {
    //   throw new Error('Album not found');
    // }
    // album.playlist_Image = await this.getFileService.execute(
    //   album.image_reference,
    // );
    // return album;
  }
}
