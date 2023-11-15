import { Inject, Injectable } from '@nestjs/common';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { IFindService } from 'src/common/domain/ifind.service';
import { Promotion } from 'src/promotions/domain/promotion';

@Injectable()
export class FindOnePromotionsService
  implements IFindService<string, Promotion>
{
  constructor(
    @Inject('IFindGenericRepository')
    private readonly promotionRepository: IFindGenericRepository<Promotion>,
    @Inject('getPromotionImageService')
    private readonly getPromotionImageService: IFindService<string, Buffer>,
  ) {}

  async execute(id: string): Promise<Promotion> {
    const result = await this.promotionRepository.find(id);
    const promotion = Array.isArray(result) ? result[0] : result;
    if (!promotion) {
      throw new Error('Promotion not found');
    }
    const image = await this.getPromotionImageService.execute(
      promotion.image_reference.toLowerCase(),
    );

    const promotionWithImage: Promotion = Object.assign(promotion, {
      image: image,
      equals: (other: Promotion) => promotion.equals(other),
    });

    return promotionWithImage;
  }
}
