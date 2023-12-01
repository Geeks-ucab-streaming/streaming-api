import { IFindService } from 'src/common/domain/ifind.service';
import { Promotion } from 'src/promotions/domain/promotion';
import { IPromotionRepository } from 'src/promotions/domain/IPromotionRepository';

export class FindAllPromotionsService
  implements IFindService<void, Promotion[]>
{
  constructor(
    private readonly promotionRepository: IPromotionRepository,
    private readonly getFileService: IFindService<string, Buffer>,
  ) {}

  async execute(): Promise<Promotion[]> {
    return this.promotionRepository.findAll();
    // const promotions: Promotion | Promotion[] =
    //   await this.promotionRepository.findAll();
    // if (Array.isArray(promotions)) {
    //   const promotionPromises = promotions.map(async (promotion) => {
    //     const image = await this.getFileService.execute(
    //       promotion.image_reference.toLowerCase(),
    //     );
    //     const promotionWithImage: Promotion = Object.assign(promotion, {
    //       image: image,
    //     });
    //     return promotionWithImage;
    //   });
    //   return Promise.all(promotionPromises);
    // }
  }
}
