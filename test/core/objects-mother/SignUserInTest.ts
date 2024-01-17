import { SignUserIn } from 'src/users/application/services/Sign-User-In.application.service';
import { findByPhoneUserService } from 'src/phones/application/services/find-by-phone-user.application.service';

export class SignUserInTest {
  public static SignUserInService(findByPhoneUserService: findByPhoneUserService){
    return new SignUserIn(findByPhoneUserService);
  }
}
