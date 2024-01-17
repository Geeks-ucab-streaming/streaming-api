import { Result } from 'src/common/domain/logic/Result';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { IAudithRepository } from 'src/common/domain/repositories/IAudithRepository';
import { ApplicationServiceDecorator } from './application.service.decorator';

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
    user_id?: string,
  ) {
    super(applicationService);
    this.operation = applicationService.name;
    this.user_id = user_id;
    
  }

  async execute(dto?: D): Promise<Result<R>> {
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
