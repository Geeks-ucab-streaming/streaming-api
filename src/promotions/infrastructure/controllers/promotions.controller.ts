import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindAllPromotionsService } from 'src/promotions/application/services/FindAllPromotions.service';
import { FindOnePromotionsService } from 'src/promotions/application/services/FindOnePromotions.service';
import { Promotion } from 'src/promotions/domain/promotion';
import { PromotionRepository } from '../Repositories/PromotionRepository';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { EntityManager, getManager } from 'typeorm';

@Controller('promotion')
export class PromotionsController {
  private readonly findOnePromotionsService: FindOnePromotionsService;
  private readonly findAllPromotionsService: FindAllPromotionsService;
  private readonly ormPromotionRepository: PromotionRepository;
  constructor(private readonly manager: EntityManager) {
    if (!manager) {
      throw new Error("Entity manager can't be null.");
    }

    this.ormPromotionRepository =
      this.manager.getCustomRepository(PromotionRepository);

    this.findAllPromotionsService = new FindAllPromotionsService(
      this.ormPromotionRepository,
      new GetFileService(process.env.PROMOTION_IMAGES_CONTAINER),
    );
    this.findOnePromotionsService = new FindOnePromotionsService(
      this.ormPromotionRepository,
      new GetFileService(process.env.PROMOTION_IMAGES_CONTAINER),
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
