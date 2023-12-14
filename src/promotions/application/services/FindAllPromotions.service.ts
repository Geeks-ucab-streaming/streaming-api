import { Promotion } from 'src/promotions/domain/promotionAqqregate/promotion';
import { IPromotionRepository } from 'src/promotions/domain/IPromotionRepository';

export class FindAllPromotionsService {
  constructor(
    private readonly promotionRepository: IPromotionRepository
  ) {}

  async execute(): Promise<Promotion[]> {
    return await this.promotionRepository.findAllpromotion();
  }
}