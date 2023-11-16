import { Inject, Injectable } from '@nestjs/common';
import { IFindService } from 'src/common/domain/ifind.service';
import { Promotion } from 'src/promotions/domain/promotion';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';

@Injectable()
export class FindAllPromotionsService
  implements IFindService<void, Promotion[]>
{
  constructor(
    @Inject('IFindGenericRepository')
    private readonly promotionRepository: IFindGenericRepository<Promotion>,
    @Inject('getPromotionImageService')
    private readonly getFileService: IFindService<string, Buffer>,
  ) {}

  async execute(): Promise<Promotion[]> {
    const promotions: Promotion | Promotion[] =
      await this.promotionRepository.find();

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
