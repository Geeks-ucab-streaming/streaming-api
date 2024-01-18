export class TrendingArtistsDto {
  artists: {
    id: string;
    name: string;
    image: Buffer;
  }[];
}
