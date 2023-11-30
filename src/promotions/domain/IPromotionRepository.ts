import { PromotionEntity } from '../infrastructure/entities/promotion.entity';

export interface IPromotionRepository {
  findById(id: string): Promise<PromotionEntity>;
  findAll(): Promise<PromotionEntity[]>;
}
