import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FindAllPromotionsService } from "src/promotions/application/services/FindAllPromotions.service";
import { FindOnePromotionsService } from "src/promotions/application/services/FindOnePromotions.service";
import { FindRandomPromotionsService } from "src/promotions/application/services/FindRandomPromotions.service";
import { Promotion } from "src/promotions/domain/promotion";

@Controller('promotion')
export class PromotionsController {
    constructor(
        @Inject('FindOnePromotionsService')
        private readonly findOnePromotionsService: FindOnePromotionsService,

        @Inject('FindAllPromotionsService')
        private readonly findRandomPromotionsService: FindRandomPromotionsService,

        @Inject('FindAllPromotionsService')
        private readonly findAllPromotionsService: FindAllPromotionsService,

    ) {}

    @ApiTags('Promotions')
    @Get()
    async findAll(): Promise<Promotion[]> {
        return await this.findAllPromotionsService.execute();
    }

    @ApiTags('Promotions')
    @Get("random")
    async findRandom(): Promise<string> {
        const promotions = await this.findRandomPromotionsService.execute();
        const randomIndex = Math.floor(Math.random() * promotions.length);
        return promotions[randomIndex];
    }

    @ApiTags('Promotions')
    @Get('/:id')
    async findById(@Param('id') id: string): Promise<Promotion> {
        return await this.findOnePromotionsService.execute(id);
    }
}