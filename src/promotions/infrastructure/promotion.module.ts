import { Module } from '@nestjs/common';
import { PromotionsController } from './controllers/promotions.controller';
import { PromotionEntity } from './entities/promotion.entity';
import { PromotionRepository } from './promotion.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { FindAllPromotionsService } from '../application/services/FindAllPromotions.service';
import { FindOnePromotionsService } from '../application/services/FindOnePromotions.service';

@Module({
  imports: [TypeOrmModule.forFeature([PromotionEntity])],
  providers: [
    {
      provide: 'IFindGenericRepository',
      useClass: PromotionRepository,
    },
    {
      provide: 'FindOnePromotionsService',
      useClass: FindOnePromotionsService,
    },
    {
      provide: 'FindAllPromotionsService',
      useClass: FindAllPromotionsService,
    },
    {
      provide: 'getPromotionImageService',
      useFactory: () => {
        return new GetFileService(process.env.PROMOTION_IMAGES_CONTAINER);
      },
    },
  ],
  controllers: [PromotionsController],
})
export class PromotionModule {}
