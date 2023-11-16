import { Promotion } from '../domain/promotion';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PromotionEntity } from './entities/promotion.entity';

export class PromotionRepository implements IFindGenericRepository<Promotion> {
  constructor(
    @InjectRepository(PromotionEntity)
    private readonly repository: Repository<Promotion>,
  ) {}

  async find(id?: string): Promise<Promotion | Promotion[]> {
    if (id) {
      const artist = await this.repository.findOne({ where: { id: id } });
      return artist ? artist : null;
    }
    return this.repository.find();
  }
}
