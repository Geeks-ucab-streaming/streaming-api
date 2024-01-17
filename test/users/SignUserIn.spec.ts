import { FindUserByPhoneTest } from '../core/objects-mother/FindUserByPhoneTest';
import { UserRepositoryMock } from '../core/repository-mocks/user.repository.mock';
import { SignUserInTest } from 'test/core/objects-mother/SignUserInTest';
import { PhoneObjectMother } from 'test/core/objects-mother/phone.object-mother';

describe('Testing SignUserIn Service...', () => {
  test('test', async () => {
    //Arrange
    const phone = PhoneObjectMother.createPhone();
    const mock = new UserRepositoryMock();
    const findByPhoneUserService = FindUserByPhoneTest.findUserByPhoneService(mock,null);
    const service = SignUserInTest.SignUserInService(findByPhoneUserService);

    //Act
    const result = await service.execute(phone.PhoneNumber.phoneNumber);

    //Assert
    expect(result.IsSuccess).toBeDefined();
  });
});
