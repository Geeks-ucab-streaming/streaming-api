import { DataSourceSingleton } from '../../src/common/infrastructure/dataSourceSingleton';
import { TransactionHandlerImplementation } from '../../src/common/infrastructure/transaction_handler_implementation';
import { FindUserByPhoneTest } from '../core/objects-mother/FindUserByPhoneTest';
import { UserObjectMother } from '../../test/core/objects-mother/user.object-mother';
import { UserRepositoryMock } from '../../test/core/repository-mocks/user.repository.mock';

describe('FindUserByPhoneService!!', () => {
  test('test', async () => {
    //Arrange
    const user = UserObjectMother.createUser();
    const mock = new UserRepositoryMock();

    const service = FindUserByPhoneTest.findUserByPhoneService(mock, null);

    //Act
    const result = await service.execute(user.Phone.PhoneNumber.phoneNumber);

    //Assert
    expect(result.IsSuccess).toBeTruthy();
  });
});
