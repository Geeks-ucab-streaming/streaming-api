import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindAllPromotionsService } from 'src/promotions/application/services/FindAllPromotions.service';
import { FindOnePromotionsService } from 'src/promotions/application/services/FindOnePromotions.service';
import { Promotion } from 'src/promotions/domain/promotion';
import { OrmPromotionRepository } from '../Repositories/promotion.repository.impl';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { DataSourceSingleton } from 'src/core/infrastructure/dataSourceSingleton';

@Controller('promotion')
export class PromotionsController {
  private readonly findOnePromotionsService: FindOnePromotionsService;
  private readonly findAllPromotionsService: FindAllPromotionsService;
  private readonly ormPromotionRepository: OrmPromotionRepository;
  constructor() {
    this.ormPromotionRepository = new OrmPromotionRepository(
      DataSourceSingleton.getInstance(),
    );

    this.findAllPromotionsService = new FindAllPromotionsService(
      this.ormPromotionRepository,
    );
    this.findOnePromotionsService = new FindOnePromotionsService(
      this.ormPromotionRepository,
    );
  }

  @Get()
  async findAll(): Promise<Promotion[]> {
    return await this.findAllPromotionsService.execute();
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Promotion> {
    return await this.findOnePromotionsService.execute(id);
  }
}
