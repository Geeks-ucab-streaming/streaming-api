import { Inject, Injectable } from "@nestjs/common";
import { IFindGenericRepository } from "src/common/domain/generic.repository";
import { IFindService } from "src/common/domain/ifind.service";
import { Promotion } from "src/promotions/domain/promotion";

@Injectable()
export class FindRandomPromotionsService {
    constructor(
        @Inject('IFindGenericRepository')
        private readonly promotionRepository: IFindGenericRepository<Promotion>,
        @Inject('getPromotionImageService')
        private readonly getFileService: IFindService<string, Buffer>,
      ) {}

    async execute(): Promise<string> {
        const promotions = await this.promotionRepository.findr();

        if (promotions.length === 0) {
            throw new Error('No hay promociones disponibles');
        }

        const randomIndex = Math.floor(Math.random() * promotions.length);

        return promotions[randomIndex].id.toString();
    }
}