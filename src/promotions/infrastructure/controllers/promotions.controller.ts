import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindAllPromotionsService } from 'src/promotions/application/services/FindAllPromotions.service';
import { FindOnePromotionsService } from 'src/promotions/application/services/FindOnePromotions.service';
import { Promotion } from 'src/promotions/domain/promotion';

@Controller('promotion')
export class PromotionsController {
  constructor(
    @Inject('FindOnePromotionsService')
    private readonly findOnePromotionsService: FindOnePromotionsService,

    @Inject('FindAllPromotionsService')
    private readonly findAllPromotionsService: FindAllPromotionsService,
  ) {}

  @Get()
  async findAll(): Promise<Promotion[]> {
    return await this.findAllPromotionsService.execute();
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Promotion> {
    return await this.findOnePromotionsService.execute(id);
  }
}
