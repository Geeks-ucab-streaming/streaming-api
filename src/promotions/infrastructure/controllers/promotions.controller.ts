import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindAllPromotionsService } from 'src/promotions/application/services/FindAllPromotions.service';
import { FindOnePromotionsService } from 'src/promotions/application/services/FindOnePromotions.service';
import { Promotion } from 'src/promotions/domain/promotion';
import { OrmPromotionRepository } from '../Repositories/promotion.repository.impl';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { DataSourceSingleton } from 'src/common/infrastructure/dataSourceSingleton';
import { ApiTags } from '@nestjs/swagger';
import { PromotionDto } from 'src/dtos';
import { FindRandomPromotionsService } from 'src/promotions/application/services/FindRandomPromotion.service';

@Controller('api/promotion')
export class PromotionsController {
  private readonly findOnePromotionsService: FindOnePromotionsService;
  private readonly findAllPromotionsService: FindAllPromotionsService;
  private readonly findRandomPromotionsService: FindRandomPromotionsService;
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
    this.findRandomPromotionsService = new FindRandomPromotionsService(
      this.ormPromotionRepository,
    );
  }
  @ApiTags('Promotions')
  @Get()
  async findRandomPromotion(): Promise<PromotionDto> {
    const promotion: Promotion =
      await this.findRandomPromotionsService.execute();
    return promotion;
  }
  // async findAll(): Promise<PromotionDto[]> {
  //   let promos: PromotionDto[] = [];
  //   const promotions: Promotion[] =
  //     await this.findAllPromotionsService.execute();
  //   for (const promo of promotions) {
  //     promos.push({ id: promo.id, image: promo.image });
  //   }
  //   return promos;
  // }
  @ApiTags('Promotions')
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<PromotionDto> {
    const promotion: Promotion =
      await this.findOnePromotionsService.execute(id);
    let promo: PromotionDto = { id: promotion.id, image: promotion.image };
    return promo;
  }
}
