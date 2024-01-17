import { Promotion } from './promotion';
import { PromoID } from './value-objects/PromoID-valueobject';

export interface IPromotionRepository {
  findById(id: PromoID): Promise<Promotion>;
  findAll(): Promise<Promotion[]>;
  findRandomPromotion(): Promise<Promotion>;
}
