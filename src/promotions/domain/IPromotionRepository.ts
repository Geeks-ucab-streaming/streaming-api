import { Promotion } from './promotionAqqregate/promotion';
import { PromotionId } from './promotionAqqregate/value-objects/promotionid-valueobject';

export interface IPromotionRepository {
  createPromotion(promotion: Promotion): Promise<Promotion>;
  findAllpromotion(): Promise<Promotion[]>;
  findByIdpromotion(id: string): Promise<Promotion>;
}