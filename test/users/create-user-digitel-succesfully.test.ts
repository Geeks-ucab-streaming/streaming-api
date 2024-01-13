/*import { LoggingApplicationServiceDecorator } from "src/common/Application/application-service/decorators/error-decorator/loggin-application.service.decorator";
import { NestLogger } from "src/common/infrastructure/logger/nest-logger";
import { findByPhoneUserService } from "src/phones/application/services/find-by-phone-user.application.service";
import { PhonesService } from "src/phones/application/services/register-users-phone.application.service";
import { SignUserUpDigitel } from "src/users/application/services/Sign-User-Up-Digitel.application.service";
import { UserObjectMother } from "test/core/objects-mother/user.object-mother";
import { TokenRepositoryMock } from "test/core/repository-mocks/token.reposiroty.mock";
import { UserRepositoryMock } from "test/core/repository-mocks/user.repository.mock";

describe('Create user into the system', () => {

  it('Succesfully', async () => {

      //ARRANGE 
      const user = UserObjectMother.createUser();

      const userRepository = new UserRepositoryMock();
      userRepository.createUser(user);

      const tokenRepository = new TokenRepositoryMock();
      const lineRepository = new LineRepositoryMock();
      const phoneRepository = new PhoneRepositoryMock();

      const createPhonesService = new PhonesService(
        /*this.phoneRepository,
        this.lineRepository,
      );

      const getUserByPhoneService = new findByPhoneUserService(
        userRepository,
      );

      const service = new LoggingApplicationServiceDecorator(
        new SignUserUpDigitel(
          createPhonesService,
          getUserByPhoneService,
          tokenRepository,
          userRepository,
        ),
        new NestLogger(),
      );

      const result = await service.execute();
       
      //ACT
  

      //ASSERT
      expect(result.IsSuccess).toBeTruthy();

  })
});*/