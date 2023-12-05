import { Inject, Injectable } from "@nestjs/common";
import { IFindGenericRepository } from "src/common/domain/generic.repository";
import { IFindService } from "src/common/domain/ifind.service";
import { Promotion } from "src/promotions/domain/promotion";

@Injectable()
export class FindAllPromotionsService implements IFindService<void, Promotion[]> {
  constructor(
    @Inject('IFindGenericRepository')
    private readonly promotionRepository: IFindGenericRepository<Promotion>,
    @Inject('getPromotionImageService')
    private readonly getFileService: IFindService<string, Buffer>,
  ) {}

  async execute(): Promise<Promotion[]> {
    const promotions: Promotion[] = await this.promotionRepository.findAll();

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
