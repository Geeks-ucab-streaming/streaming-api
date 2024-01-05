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
import { Result } from 'src/common/domain/logic/Result';
import { MyResponse } from 'src/common/infrastructure/Response';

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
  async findRandomPromotion(): Promise<MyResponse<PromotionDto>> {
    const response: Result<Promotion> =
      await this.findRandomPromotionsService.execute();
    if (response.IsSuccess) {
      const promotion = response.Value;
      return MyResponse.success(promotion);
    }
    MyResponse.fail(response.statusCode, response.message, response.error);
  }

  @ApiTags('Promotions')
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<MyResponse<PromotionDto>> {
    const response: Result<Promotion> =
      await this.findOnePromotionsService.execute(id);
    if (response.IsSuccess) {
      const promotion: Promotion = response.Value;
      let promo: PromotionDto = { id: promotion.id, image: promotion.image };
      return MyResponse.success(promo);
    }
    MyResponse.fail(response.statusCode, response.message, response.error);
  }
}
