import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindAllPromotionsService } from 'src/promotions/application/services/FindAllPromotions.service';
import { FindOnePromotionsService } from 'src/promotions/application/services/FindOnePromotions.service';
import { Promotion } from 'src/promotions/domain/promotionAqqregate/promotion';
import { ApiTags } from '@nestjs/swagger';
import { PromotionId } from 'src/promotions/domain/promotionAqqregate/value-objects/promotionid-valueobject';
import { PromotionMapper } from '../mappers/promotion.mapper';
import { IPromotionRepository } from 'src/promotions/domain/IPromotionRepository';
import { DataSourceSingleton } from 'src/core/infrastructure/dataSourceSingleton';
import { OrmPromotionRepository } from '../Repositories/promotion.repository.impl';
import { FindRandomPromotionsService } from 'src/promotions/application/services/FindRandomPromotions.service';

@Controller('api/promotion')
export class PromotionsController {
  private readonly findAllPromotionsService: FindAllPromotionsService;
  private findOnePromotionsService: FindOnePromotionsService;
  private findRandomPromotionsService: FindRandomPromotionsService;
  private readonly ormPromotionRepository : IPromotionRepository;

  constructor() {
    this.ormPromotionRepository = new OrmPromotionRepository(DataSourceSingleton.getInstance());
    this.findOnePromotionsService = new FindOnePromotionsService(this.ormPromotionRepository);
    this.findAllPromotionsService = new FindAllPromotionsService(this.ormPromotionRepository);
    this.findRandomPromotionsService  = new FindRandomPromotionsService(this.ormPromotionRepository);
  }

  @ApiTags('Promotions')
  @Get()
  async findAll(): Promise<Promotion[]> {
    return this.findAllPromotionsService.execute();
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
