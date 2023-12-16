import { DataSource, Repository } from 'typeorm';
import { PromotionEntity } from '../entities/promotion.entity';
import { IPromotionRepository } from '../../domain/IPromotionRepository';
import { Promotion } from 'src/promotions/domain/promotion';
import { GetFileService } from '../../../common/infrastructure/services/getFile.service';

export class OrmPromotionRepository
  extends Repository<PromotionEntity>
  implements IPromotionRepository
{
  private readonly getPromoImageService: GetFileService;
  constructor(dataSource: DataSource) {
    super(PromotionEntity, dataSource.manager);
    this.getPromoImageService = new GetFileService(
      process.env.PROMOTION_IMAGES_CONTAINER,
    );
  }
  async findById(id: string): Promise<Promotion> {
    const promotion = await this.findOne({ where: { id: id } });

    const promoImage = await this.getPromoImageService.execute(
      promotion.image_reference,
    );

    const promotionWithImage: Promotion = { ...promotion, image: promoImage };

    return promotionWithImage;

    // return promotion ? promotion : null;
  }
  async findAll(): Promise<Promotion[]> {
    let promotions = await this.find();

    if (Array.isArray(promotions)) {
      const promotionPromises = promotions.map(async (promotion) => {
        const image = await this.getPromoImageService.execute(
          promotion.image_reference.toLowerCase(),
        );

        const promotionWithImage: Promotion = Object.assign(promotion, {
          image: image,
        });

        return promotionWithImage;
      });
      return Promise.all(promotionPromises);
    }
  }

  async findRandomPromotion(): Promise<Promotion> {
    let promotion = await this.createQueryBuilder('entity')
      .orderBy('RANDOM()')
      .getOne();
    const image = await this.getPromoImageService.execute(
      promotion.image_reference.toLowerCase(),
    );
    const promoWithImage: Promotion = { ...promotion, image: image };
    return promoWithImage;
  }
}
