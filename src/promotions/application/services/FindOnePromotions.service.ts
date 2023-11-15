import { Inject, Injectable } from "@nestjs/common";
import { IGenericRepository } from "src/common/domain/generic.repository";
import { IFindService } from "src/common/domain/ifind.service";
import { Promotion } from "src/promotions/domain/promotion";

@Injectable()
export class FindOnePromotionsService implements IFindService<string, Promotion> {
  constructor(
    @Inject('IGenericRepository')
    private readonly promotionRepository: IGenericRepository<Promotion>,
    @Inject('getPromotionImageService')
    private readonly getPromotionImageService: IFindService<string, Buffer>,
  ) {}

    async execute(id: string): Promise<Promotion> {
        const promotion = await this.promotionRepository.findById(id);
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
    