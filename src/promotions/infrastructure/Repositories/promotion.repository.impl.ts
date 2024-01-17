import { DataSource, Repository } from 'typeorm';
import { PromotionEntity } from '../entities/promotion.entity';
import { IPromotionRepository } from '../../domain/IPromotionRepository';
import { Promotion } from 'src/promotions/domain/promotion';
import { GetFileService } from '../../../common/infrastructure/services/getFile.service';
import { PromoID } from 'src/promotions/domain/value-objects/PromoID-valueobject';
import { PromosMapper } from '../mapper/promoMapper';

export class OrmPromotionRepository
  extends Repository<PromotionEntity>
  implements IPromotionRepository
{
  private readonly promoMapper: PromosMapper;
  private readonly getPromoImageService: GetFileService;
  constructor(dataSource: DataSource) {
    super(PromotionEntity, dataSource.manager);
    this.getPromoImageService = new GetFileService(
      process.env.PROMOTION_IMAGES_CONTAINER,
    );
    this.promoMapper = new PromosMapper();
  }
  async findById(id: PromoID): Promise<Promotion> {
    const promotion = await this.findOne({ where: { id: id.Value } });

    if (promotion) {
      const domainPromo: Promotion = await this.promoMapper.ToDomain(promotion);

      return domainPromo;
    }
    return null;

    // return promotion ? promotion : null;
  }
  async findAll(): Promise<Promotion[]> {
    let promotions = await this.find();

    if (promotions) {
      let domainPromisePromos: Promise<Promotion>[];
      promotions.forEach((promo) =>
        domainPromisePromos.push(this.promoMapper.ToDomain(promo)),
      );

      return Promise.all(domainPromisePromos);
    }
    return null;
  }

  async findRandomPromotion(): Promise<Promotion> {
    let promotion = await this.createQueryBuilder('entity')
      .orderBy('RANDOM()')
      .getOne();

    if (promotion) {
      const domainPromo: Promotion = await this.promoMapper.ToDomain(promotion);

      return domainPromo;
    }
    return null;
  }
}
