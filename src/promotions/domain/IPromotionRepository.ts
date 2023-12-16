import { Promotion } from './promotion';

export interface IPromotionRepository {
  findById(id: string): Promise<Promotion>;
  findAll(): Promise<Promotion[]>;
  findRandomPromotion(): Promise<Promotion>;
}
