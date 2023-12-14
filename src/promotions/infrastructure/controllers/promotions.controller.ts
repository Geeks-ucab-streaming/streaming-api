import { Controller, Get, Param } from '@nestjs/common';
import { DataSourceSingleton } from 'src/core/infrastructure/dataSourceSingleton';
import { Promotion } from 'src/promotions/domain/promotionAqqregate/promotion';
import { ApiTags } from '@nestjs/swagger';
import { IPromotionRepository } from 'src/promotions/domain/IPromotionRepository';

import { OrmPromotionRepository } from '../Repositories/promotion.repository.impl';
import { FindRandomPromotionsService } from 'src/promotions/application/services/FindRandomPromotions.service';
import { FindOnePromotionsService } from 'src/promotions/application/services/FindOnePromotions.service';

@Controller('api/promotion')
export class PromotionsController {
  private findOnePromotionsService: FindOnePromotionsService;
  private findRandomPromotionsService: FindRandomPromotionsService;
  private readonly ormPromotionRepository : IPromotionRepository;

  constructor() {
    this.ormPromotionRepository = new OrmPromotionRepository(DataSourceSingleton.getInstance());
    this.findOnePromotionsService = new FindOnePromotionsService(this.ormPromotionRepository);
    this.findRandomPromotionsService  = new FindRandomPromotionsService(this.ormPromotionRepository);
  }

  @ApiTags('Promotions')
  @Get('random')
  async findRandom(): Promise<Promotion> {
    return this.findRandomPromotionsService.execute();
  }

  @ApiTags('Promotions')
  @Get(':Id')
  async findById(@Param('Id') id: string): Promise<Promotion> {
    return this.findOnePromotionsService.execute(id);
  }
}
