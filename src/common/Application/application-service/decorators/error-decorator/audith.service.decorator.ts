import { Result } from 'src/common/domain/logic/Result';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { ApplicationServiceDecorator } from 'src/common/Application/application-service/decorators/error-decorator/application.service.decorator';
import { IAudithRepository } from 'src/common/domain/repositories/IAudithRepository';

/** AudithApplicationServiceDecorator: Es un decorador para agregar la auditoria.*/
export class AudithApplicationServiceDecorator<
  D,
  R,
> extends ApplicationServiceDecorator<D, R> {
  private readonly operation: string;
  private readonly user_id: string;
  private data: string;

  constructor(
    applicationService: IApplicationService<D, R>,
    private readonly audithRepo: IAudithRepository,
  ) {
    super(applicationService);
    this.operation = applicationService.name;
    
  }

  async execute(dto: D): Promise<Result<R>> {
        const result = await super.execute(dto);

    try { 
        if (result.IsSuccess === false) {
            this.data = JSON.stringify(result.Error);
        }else{
            this.data = JSON.stringify(result.Value);    
        }
    }catch (error) {
        this.data = "Error al serializar el resultado";
    }
    this.audithRepo.addAudith(this.user_id, this.operation, this.data);
    
    return result;
  }
}
