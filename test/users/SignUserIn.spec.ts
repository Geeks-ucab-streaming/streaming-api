import { FindUserByPhoneTest } from '../core/objects-mother/FindUserByPhoneTest';
import { UserRepositoryMock } from '../core/repository-mocks/user.repository.mock';
import { UserObjectMother } from 'test/core/objects-mother/user.object-mother';
import { SignUserInTest } from 'test/core/objects-mother/SignUserInTest';

describe('Testing SignUserIn Service...', () => {
  test('test', async () => {
    //Arrange
    const user = UserObjectMother.createUser();
    const mock = new UserRepositoryMock();
    const findByPhoneUserService = FindUserByPhoneTest.findUserByPhoneService(mock,null);
    const service = SignUserInTest.SignUserInService(findByPhoneUserService);

    //Act
    const findUser = await findByPhoneUserService.execute(user.Phone.PhoneNumber.phoneNumber,);
    const result = await service.execute(findUser.Value.Phone.PhoneNumber.phoneNumber);

    //Assert
    expect(result.IsSuccess).toBeTruthy();
  });
});
