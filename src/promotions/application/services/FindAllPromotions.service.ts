import { IFindService } from 'src/common/domain/ifind.service';
import { Promotion } from 'src/promotions/domain/promotion';
import { PromotionEntity } from 'src/promotions/infrastructure/entities/promotion.entity';
import { IPromotionRepository } from 'src/promotions/domain/IPromotionRepository';

export class FindAllPromotionsService
  implements IFindService<void, Promotion[]>
{
  constructor(
    private readonly promotionRepository: IPromotionRepository,
    private readonly getFileService: IFindService<string, Buffer>,
  ) {}

  async execute(): Promise<Promotion[]> {
    const promotions: PromotionEntity | PromotionEntity[] =
      await this.promotionRepository.findAll();

    if (Array.isArray(promotions)) {
      const promotionPromises = promotions.map(async (promotion) => {
        const image = await this.getFileService.execute(
          promotion.image_reference.toLowerCase(),
        );

        const promotionWithImage: Promotion = Object.assign(promotion, {
          image: image,
          equals: (other: Promotion) => promotion.equals(other),
        });

        return promotionWithImage;
      });
      return Promise.all(promotionPromises);
    }
  }
}
