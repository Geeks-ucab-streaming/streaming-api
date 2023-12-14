import { IFindService } from 'src/common/domain/ifind.service';
import { Promotion } from 'src/promotions/domain/promotionAqqregate/promotion';
import { IPromotionRepository } from 'src/promotions/domain/IPromotionRepository';

export class FindOnePromotionsService implements IFindService<string, Promotion>
{
  constructor(private readonly promotionRepository: IPromotionRepository) {
    this.promotionRepository = promotionRepository;
  }

  async execute(promotionid: string): Promise<Promotion> {
      const promotion : Promotion = await this.promotionRepository.findByIdpromotion(promotionid);
    return promotion;
  }
}
