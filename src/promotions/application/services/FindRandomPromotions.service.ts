import { IPromotionRepository } from "src/promotions/domain/IPromotionRepository";
import { Promotion } from "src/promotions/domain/promotionAqqregate/promotion";

export class FindRandomPromotionsService {
    constructor(
        private readonly promotionRepository: IPromotionRepository // Asegúrate de reemplazar FileService con el nombre real del servicio que estás utilizando
      ) {}

    async execute(): Promise<Promotion> {
        const allPromotions : Promotion[] = await this.promotionRepository.findAllpromotion();

        if (allPromotions.length === 0) {
          throw new Error('No promotions found');
        }
      
        const randomIndex = Math.floor(Math.random() * allPromotions.length);
        const randomPromotion = allPromotions[randomIndex];
      
        return randomPromotion;
    }
}