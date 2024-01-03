import {
  IsUUID,
  IsString,
  IsEmail,
  IsDate,
  IsIn,
  IsOptional,
  MinLength,
} from 'class-validator';

export class PromotionDto {
  id: string;
  image: Buffer;
}

export class TopPlaylistDto {
  playlists: {
    id: string;
    image: Buffer;
  }[];
}

export class TopAlbumsDto {
  playlists: {
    id: string;
    image: Buffer;
  }[];
}

export class PlaylistDto {
  id: string;
  name: string;
  duration: string;
  image: Buffer;
  creators?: {
    creatorId: string;
    creatorName: string;
  }[];
  songs: SongDto[];
}

export class SongDto {
  songId: string;
  name: string;
  duration: string;
  image: Buffer;
  artists: {
    id: string;
    name: string;
  }[];
}

export class TrendingArtistsDto {
  artists: {
    id: string;
    name: string;
    image: Buffer;
  }[];
}

export class AllArtistInfoDto {
  id: string;
  name: string;
  image: Buffer;
  genre: string;
  albums: {
    id: string;
    image: Buffer;
  }[];
  songs: {
    id: string;
    name: string;
    duration: string;
    image: Buffer;
    artists: {
      id: string;
      name: string;
    }[];
  }[];
}

export class userProfileDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  name: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsDate()
  @IsOptional()
  birthdate: Date;

  @IsIn(['M', 'F', 'O'])
  @IsOptional()
  genre: string;
}
