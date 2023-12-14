import { Promotion } from './promotionAqqregate/promotion';

export interface IPromotionRepository {
  createPromotion(promotion: Promotion): Promise<Promotion>;
  findAllpromotion(): Promise<Promotion[]>;
  findByIdpromotion(id: string): Promise<Promotion>;
}
