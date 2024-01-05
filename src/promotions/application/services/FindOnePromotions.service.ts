import { IFindService } from 'src/common/domain/ifind.service';
import { Promotion } from 'src/promotions/domain/promotion';
import { IPromotionRepository } from 'src/promotions/domain/IPromotionRepository';
import { Result } from 'src/common/domain/logic/Result';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { DomainException } from 'src/common/domain/exceptions/domain-exception';

export class FindOnePromotionsService
  implements IApplicationService<string, Promotion>
{
  private readonly promotionRepository: IPromotionRepository;
  constructor(promotionRepository: IPromotionRepository) {
    this.promotionRepository = promotionRepository;
  }
  get name(): string {
    return this.constructor.name;
  }

  async execute(id: string): Promise<Result<Promotion>> {
    const res = await this.promotionRepository.findById(id);
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
