import { DataSource, Repository } from 'typeorm';
import { PromotionEntity } from '../entities/promotion.entity';
import { IPromotionRepository } from '../../domain/IPromotionRepository';
import { Promotion } from 'src/promotions/domain/promotionAqqregate/promotion';
import { GetFileService } from '../../../common/infrastructure/services/getFile.service';
import { PromotionMapper } from '../mappers/promotion.mapper';
import { PromotionId } from 'src/promotions/domain/promotionAqqregate/value-objects/promotionid-valueobject';

export class OrmPromotionRepository
  extends Repository<PromotionEntity>
  implements IPromotionRepository
{
  private readonly promotionMapper: PromotionMapper;
 private readonly repository: Repository<Promotion>;
  
 constructor(dataSource: DataSource) {
    super(PromotionEntity, dataSource.manager);
    this.repository = new Repository<Promotion>(PromotionEntity, dataSource.manager);
    this.promotionMapper = new PromotionMapper();
  }

  async createPromotion(promotion: Promotion): Promise<Promotion> {
    const createPromotion = await this.promotionMapper.domainToOrm(promotion);
    await this.save(createPromotion);
    return promotion;
  }

  async findAllpromotion(): Promise<Promotion[]> {
    const promotionAll = await this.find();
    if (!promotionAll) {
      throw new Error('Promotion not found');
    }
    const promotion : Promotion[] = [];
    for (const promotionEntity of promotionAll) {
      promotion.push(await this.promotionMapper.ormToDomain(promotionEntity));
    }    
    return promotion; // Added return statement
  }

  async findByIdpromotion(promotionid: string): Promise<Promotion> {
    // get promotion by id
    console.log(promotionid)
    
    let promotionResponse = await this.findOneBy({ id: promotionid });
    console.log(promotionResponse);
    if (!promotionResponse) {
      throw new Error('Promotion not found');
    }
    return await this.promotionMapper.ormToDomain(promotionResponse);
  }

}
