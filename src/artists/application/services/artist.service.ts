import { Injectable } from '@nestjs/common';
import { Artist } from '../../domain/artist';
import { ArtistDto } from '../dtos/artist.dto';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  create(artistDto: ArtistDto): Artist {
    const artist = new Artist(
      artistDto.id,
      artistDto.name,
      artistDto.duration,
      artistDto.image_reference,
    );
    this.artists.push(artist);
    return artist;
  }

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    return this.artists.find((artist) => artist.id === id);
  }

  update(id: string, artistDto: ArtistDto): Artist {
    const artist = this.findOne(id);
    if (artist) {
      artist.name = artistDto.name;
      artist.duration = artistDto.duration;
      artist.image_reference = artistDto.image_reference;
    }
    return artist;
  }

  remove(id: string): void {
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
