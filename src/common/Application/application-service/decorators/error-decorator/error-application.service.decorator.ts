import { DomainException } from "src/common/domain/exceptions/domain-exception";
import { ApplicationServiceDecorator } from "./application.service.decorator";
import { Result } from "src/common/domain/logic/Result";

/**ErrorApplicationServiceDecorator es un decorador de servicio de aplicación utilizado para el manejo de las excepciones de dominio.*/
export class ErrorApplicationServiceDecorator<D,R,> extends ApplicationServiceDecorator<D, R> {
  async execute(dto?: D): Promise<Result<R>> {
    try {
      const returning = await super.execute(dto);
      return returning;
    } catch (error) {
      if (error.constructor.name) {
        const domainError: DomainException<R> = error as DomainException<R>;
        const result = Result.fail<R>(error);
        return result;
      } else {
        throw error;
      }
    }
  }
}
