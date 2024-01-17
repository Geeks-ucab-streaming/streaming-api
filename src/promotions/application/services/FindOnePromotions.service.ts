import { IFindService } from 'src/common/domain/ifind.service';
import { Promotion } from 'src/promotions/domain/promotion';
import { IPromotionRepository } from 'src/promotions/domain/IPromotionRepository';
import { Result } from 'src/common/domain/logic/Result';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { DomainException } from 'src/common/domain/exceptions/domain-exception';
import { PromoID } from 'src/promotions/domain/value-objects/PromoID-valueobject';

export interface FindOnePromotionsServiceDto {
  id: PromoID;
}

export class FindOnePromotionsService
  implements IApplicationService<FindOnePromotionsServiceDto, Promotion>
{
  private readonly promotionRepository: IPromotionRepository;
  constructor(promotionRepository: IPromotionRepository) {
    this.promotionRepository = promotionRepository;
  }
  get name(): string {
    return this.constructor.name;
  }

  async execute(dto: FindOnePromotionsServiceDto): Promise<Result<Promotion>> {
    const res = await this.promotionRepository.findById(dto.id);
    if (res) return Result.success(res);
    return Result.fail(
      new DomainException(
        void 0,
        `No se encontró ninguna promoción`,
        'Not Found Exception',
        404,
      ),
    );
  }
}
