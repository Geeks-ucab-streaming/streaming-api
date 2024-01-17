import { UserRepositoryMock } from '../repository-mocks/user.repository.mock';
import { findByPhoneUserService } from '../../../src/phones/application/services/find-by-phone-user.application.service';
import { ItransactionHandler } from '../../../src/common/domain/transaction_handler/transaction_handler';

export class FindUserByPhoneTest {
  public static findUserByPhoneService(mock: UserRepositoryMock,mockth: ItransactionHandler,) {
    return new findByPhoneUserService(mock, mockth);
  }
}
