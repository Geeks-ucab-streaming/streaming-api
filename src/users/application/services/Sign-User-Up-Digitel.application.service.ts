import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { User } from 'src/users/domain/userAggregate/user';
import { NotFoundException } from '@nestjs/common';
import { Phone } from 'src/phones/domain/phoneAggregate/phone';
import { IUserRepository } from 'src/users/domain/IUserRepository';
import { UserFactory } from 'src/users/domain/factories/user.factory';
import { Result } from '../../../common/domain/logic/Result';
import { DomainException } from '../../../common/domain/exceptions/domain-exception';
import { ITokenUserRepository } from '../../domain/tokenUser.repository';
import { Token } from '../../domain/userAggregate/value-objects/token';
import { ItransactionHandler } from '../../../common/domain/transaction_handler/transaction_handler';
import { ICreateUserDto } from 'src/common/Application/dtoPorts/createUserDtoPort';

export class SignUserUpDigitel
  implements IApplicationService<ICreateUserDto, User>
{
  constructor(
    private phone: IApplicationService<string, Phone>,
    private findByPhoneUserService: IApplicationService<string, User>,
    private readonly tokenRepository: ITokenUserRepository,
    private readonly repo: IUserRepository,
    private readonly transactionHandler: ItransactionHandler,
  ) {}

  get name(): string {
    return this.constructor.name;
  }

  async execute(usersDto: ICreateUserDto): Promise<Result<User>> {
    await this.transactionHandler.startTransaction();
    const users = await this.findByPhoneUserService.execute(usersDto.phone);

    if (users.Value) {
      throw new NotFoundException('User Alredy exists');
    }

    let phoneDigitel = await this.phone.execute(usersDto.phone);

    if (!phoneDigitel.IsSuccess) {
      await this.transactionHandler.rollbackTransaction();
      return Result.fail<User>(
        new DomainException<string>(
          void 0,
          phoneDigitel.message,
          phoneDigitel.error,
          phoneDigitel.statusCode,
        ),
      );
    }

    if (!phoneDigitel.Value.validatePrefixDigitel()) {
      await this.transactionHandler.rollbackTransaction();
      return Result.fail<User>(
        new DomainException<string>(
          void 0,
          'Phone prefix is not from Digitel',
          'DomainException',
          404,
        ),
      );
    }

    const savedUser = await this.repo.createUser(
      UserFactory.userFactoryMethod(
        phoneDigitel.Value.Id.Id,
        phoneDigitel.Value.PhoneNumber.phoneNumber,
        phoneDigitel.Value.LinePhone.id,
        phoneDigitel.Value.LinePhone.name,
        usersDto.token,
        'premium',
      ),
      this.transactionHandler,
    );
    const token = Token.create(
      usersDto.token,
      savedUser.value.Id.Id,
    );
    await this.tokenRepository.saveToken(token, this.transactionHandler);
    await this.transactionHandler.commitTransaction();
    return savedUser;
  }
}
