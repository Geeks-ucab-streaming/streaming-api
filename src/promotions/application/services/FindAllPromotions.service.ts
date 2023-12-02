import { IFindService } from 'src/common/domain/ifind.service';
import { Promotion } from 'src/promotions/domain/promotion';
import { IPromotionRepository } from 'src/promotions/domain/IPromotionRepository';

export class FindAllPromotionsService
  implements IFindService<void, Promotion[]>
{
  constructor(private readonly promotionRepository: IPromotionRepository) {}

  async execute(): Promise<Promotion[]> {
    return this.promotionRepository.findAll();
  }
}
