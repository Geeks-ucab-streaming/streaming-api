import { IFindService } from 'src/common/domain/ifind.service';
import { Promotion } from 'src/promotions/domain/promotionAqqregate/promotion';
import { IPromotionRepository } from 'src/promotions/domain/IPromotionRepository';
import { PromotionImageReference } from 'src/promotions/domain/promotionAqqregate/value-objects/promocionImage-valueobject';

export class FindAllPromotionsService {
  constructor(
    private readonly promotionRepository: IPromotionRepository // Asegúrate de reemplazar FileService con el nombre real del servicio que estás utilizando
  ) {}

  async execute(): Promise<Promotion[]> {
    return await this.promotionRepository.findAllpromotion();
  }
}