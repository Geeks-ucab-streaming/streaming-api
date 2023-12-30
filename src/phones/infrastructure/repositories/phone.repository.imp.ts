import { DataSource, Repository } from 'typeorm';
import { PhoneEntity } from '../../infrastructure/entities/phones.entity';
import { IPhoneRepository } from 'src/phones/domain/generic-repo-phones';
import { Phone } from '../../domain/phoneAggregate/phone';
import { Imapper } from 'src/common/Application/IMapper';
import { PhoneRegistedAlredyExceptions } from 'src/phones/domain/exceptions/phone-already-registered.exception';
import { Result } from 'src/common/domain/logic/Result';

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

  async createPhone(phone: Phone): Promise<Result<Phone>> {
    const isExistPhone = await this.findOneBy({
      phoneNumber: phone.PhoneNumber.phoneNumber,
    });
    if (isExistPhone) {
      const resultadito = Result.fail<Phone>(
        new PhoneRegistedAlredyExceptions(phone.PhoneNumber),
      );
      console.log(resultadito);
      return resultadito;
    }
    const phoneToOrm = await this.phoneMapper.domainTo(phone);
    const phoneCreated = await this.phoneMapper.ToDomain(
      await this.save(phoneToOrm),
    );
    return Result.success<Phone>(phoneCreated);
  }
}
