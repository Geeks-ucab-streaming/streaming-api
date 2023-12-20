import { IFindService } from 'src/common/domain/ifind.service';
import { Promotion } from 'src/promotions/domain/promotion';
import { IPromotionRepository } from 'src/promotions/domain/IPromotionRepository';

export class FindOnePromotionsService
  implements IFindService<string, Promotion>
{
  private readonly promotionRepository: IPromotionRepository;
  constructor(promotionRepository: IPromotionRepository) {
    this.promotionRepository = promotionRepository;
  }

  async execute(id: string): Promise<Promotion> {
    return this.promotionRepository.findById(id);
  }
}
