import { Imapper } from 'src/common/Application/IMapper';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { Promotion } from 'src/promotions/domain/promotion';
import { PromotionEntity } from '../entities/promotion.entity';

export class PromosMapper implements Imapper<Promotion, PromotionEntity> {
  private readonly getPromoImageService: GetFileService;

  constructor() {
    this.getPromoImageService = new GetFileService(
      process.env.PROMOTION_IMAGES_CONTAINER,
    );
  }

  domainTo(domainEntity: Promotion): Promise<PromotionEntity> {
    throw new Error('Method not implemented.');
  }
  async ToDomain(ormEntity: PromotionEntity): Promise<Promotion> {
    let promo: Promotion = Promotion.create(
      ormEntity.id,
      ormEntity.image_reference,
    );
    const promoImage = await this.getPromoImageService.execute(
      promo.Image_Reference,
    );
    promo.setImage(promoImage);
    return promo;
  }
}
