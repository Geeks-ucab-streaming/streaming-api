import { Isearch } from "src/core/application/Isearch";
import { FindArtistsInCollectionService } from "./findArtistsInCollection.service";
import { Artist } from "src/artists/domain/artist";
import { Result } from "src/common/domain/logic/Result";
import { GetAllArtistsApplicationService } from "./get-all-artists.application.service";
import { OrmArtistRepository } from "src/artists/infrastructure/repositories/artist.repository.impl";

export class SearchArtistService implements Isearch<Artist,Result<OrmArtistRepository>> {
  constructor(private readonly artist:Artist) {}

  async search(artist: OrmArtistRepository): Promise<Artist[]> {
    return await this.search(OrmArtistRepository);
  }
}