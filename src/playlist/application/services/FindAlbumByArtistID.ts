import { Inject, Injectable } from "@nestjs/common";
import { IFindService } from "src/common/domain/ifind.service";
import { IFindGenericRepository } from "src/common/domain/ifindgeneric.repository";
import { Playlist } from "src/playlist/domain/playlist";

@Injectable()
export class FindAlbumByArtistIDService implements IFindService<string, Playlist> {
  constructor(
    @Inject('PlaylistRepository')
    private readonly albumRepository: IFindGenericRepository<Playlist>,
    @Inject('GetAlbumImageService')
    private readonly getFileService: IFindService<string, Buffer>,
  ) {}

  async execute(id: string): Promise<Playlist> {
    const result = await this.albumRepository.find(id);
    const album = Array.isArray(result) ? result[0] : result;
    if (!album) {
      throw new Error('Album not found');
    }
    album.playlist_Image = await this.getFileService.execute(
      album.image_reference,
    );
    return album;

  }
}