import { EntityRepository, Repository } from 'typeorm';
import { PromotionEntity } from '../entities/promotion.entity';
import { IPromotionRepository } from '../../domain/IPromotionRepository';

@EntityRepository(PromotionEntity)
export class PromotionRepository
  extends Repository<PromotionEntity>
  implements IPromotionRepository
{
  constructor() {
    super();
  }
  async findById(id: string): Promise<PromotionEntity> {
    const artist = await this.findOne({ where: { id: id } });
    return artist ? artist : null;
  }
  async findAll(): Promise<PromotionEntity[]> {
    return await this.find();
  }
}
