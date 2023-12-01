import { IFindService } from 'src/common/domain/ifind.service';
import { Promotion } from 'src/promotions/domain/promotion';
import { IPromotionRepository } from 'src/promotions/domain/IPromotionRepository';

export class FindOnePromotionsService
  implements IFindService<string, Promotion>
{
  private readonly promotionRepository: IPromotionRepository;
  private readonly getPromotionImageService: IFindService<string, Buffer>;
  constructor(
    promotionRepository: IPromotionRepository,
    getPromotionImageService: IFindService<string, Buffer>,
  ) {
    this.promotionRepository = promotionRepository;
    this.getPromotionImageService = getPromotionImageService;
  }

  async execute(id: string): Promise<Promotion> {
    return this.promotionRepository.findById(id);

    // const result = await this.promotionRepository.findById(id);
    // const promotion = Array.isArray(result) ? result[0] : result;
    // if (!promotion) {
    //   throw new Error('Promotion not found');
    // }
    // const image = await this.getPromotionImageService.execute(
    //   promotion.image_reference.toLowerCase(),
    // );

    // const promotionWithImage: Promotion = Object.assign(promotion, {
    //   image: image,
    //   equals: (other: Promotion) => promotion.equals(other),
    // });

    // return promotionWithImage;
  }
}
