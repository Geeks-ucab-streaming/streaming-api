import { IFindService } from 'src/common/domain/ifind.service';
import { Promotion } from 'src/promotions/domain/promotion';
import { IPromotionRepository } from 'src/promotions/domain/IPromotionRepository';

export class FindRandomPromotionsService
  implements IFindService<string, Promotion>
{
  private readonly promotionRepository: IPromotionRepository;
  constructor(promotionRepository: IPromotionRepository) {
    this.promotionRepository = promotionRepository;
  }

  async execute(): Promise<Promotion> {
    return this.promotionRepository.findRandomPromotion();
  }
}
