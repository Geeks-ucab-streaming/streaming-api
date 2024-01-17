import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindAllPromotionsService } from 'src/promotions/application/services/FindAllPromotions.service';
import {
  FindOnePromotionsService,
  FindOnePromotionsServiceDto,
} from 'src/promotions/application/services/FindOnePromotions.service';
import { Promotion } from 'src/promotions/domain/promotion';
import { OrmPromotionRepository } from '../Repositories/promotion.repository.impl';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { DataSourceSingleton } from 'src/common/infrastructure/dataSourceSingleton';
import { ApiTags } from '@nestjs/swagger';
import { PromotionDto } from 'src/dtos';
import { FindRandomPromotionsService } from 'src/promotions/application/services/FindRandomPromotion.service';
import { Result } from 'src/common/domain/logic/Result';
import { MyResponse } from 'src/common/infrastructure/Response';
import { PromoID } from 'src/promotions/domain/value-objects/PromoID-valueobject';

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
      const promoDto: PromotionDto = {
        id: promotion.Id.Value,
        image: promotion.Image,
      };
      return MyResponse.success(promoDto);
    }
    MyResponse.fail(response.statusCode, response.message, response.error);
  }

  @ApiTags('Promotions')
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<MyResponse<PromotionDto>> {
    const serviceDto: FindOnePromotionsServiceDto = { id: PromoID.create(id) };
    const response: Result<Promotion> =
      await this.findOnePromotionsService.execute(serviceDto);
    if (response.IsSuccess) {
      const promotion: Promotion = response.Value;
      let promo: PromotionDto = {
        id: promotion.Id.Value,
        image: promotion.Image,
      };
      return MyResponse.success(promo);
    }
    MyResponse.fail(response.statusCode, response.message, response.error);
  }
}
