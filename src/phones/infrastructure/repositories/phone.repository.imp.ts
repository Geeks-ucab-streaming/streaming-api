import { DataSource, QueryRunner, Repository } from 'typeorm';
import { PhoneEntity } from '../../infrastructure/entities/phones.entity';
import { IPhoneRepository } from 'src/phones/domain/generic-repo-phones';
import { Phone } from '../../domain/phoneAggregate/phone';
import { Imapper } from 'src/common/Application/IMapper';
import { PhoneRegistedAlredyExceptions } from 'src/phones/domain/exceptions/phone-already-registered.exception';
import { Result } from 'src/common/domain/logic/Result';
import { ItransactionHandler } from '../../../common/domain/transaction_handler/transaction_handler';
import { TransactionHandlerImplementation } from '../../../common/infrastructure/transaction_handler_implementation';

export class OrmPhoneRepository
  extends Repository<PhoneEntity>
  implements IPhoneRepository<Phone>
{
  phoneMapper: Imapper<Phone, PhoneEntity>;

  constructor(
    dataSource: DataSource,
    phoneMapper: Imapper<Phone, PhoneEntity>,
  ) {
    super(PhoneEntity, dataSource.manager);
    this.phoneMapper = phoneMapper;
  }

  async createPhone(phone: Phone, runner?: TransactionHandlerImplementation): Promise<Result<Phone>> {
    const isExistPhone = await this.findOneBy({
      phoneNumber: phone.PhoneNumber.phoneNumber,
    });
    if (isExistPhone) {
      const resultadito = Result.fail<Phone>(
        new PhoneRegistedAlredyExceptions(phone.PhoneNumber),
      );
      return resultadito;
    }

    const runnerTransaction = runner.getRunner()


    const phoneToOrm = await this.phoneMapper.domainTo(phone);
    const phoneCreated = await this.phoneMapper.ToDomain(
      await runnerTransaction.manager.save(phoneToOrm),
    );
    return Result.success<Phone>(phoneCreated);
  }
}
