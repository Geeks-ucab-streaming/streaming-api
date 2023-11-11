import { Controller, Get, Injectable, Post, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistDto } from 'src/artists/application/dtos/artist.dto';
import { Artist } from 'src/artists/domain/artist';
import { ArtistEntity } from 'src/artists/infrastructure/entities/artist.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<ArtistEntity>,

    private readonly dataSource: DataSource,
  ) {}

  public async create(artist: ArtistDto) {
    await this.artistRepository.create(artist);
    await this.artistRepository.save(artist);
  }

  public async findAll() {
    const artists = await this.artistRepository.find();
    return artists || 'manda artistas';
  }
}
