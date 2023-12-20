import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/domain/userAggregate/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor() {
    super({
      phoneField: 'phone',
    });
  }

  async validate(username: string, password: string) {
    const user: User =  null //await this.authService.validateUser(username, password);
    if (!user) throw new UnauthorizedException('Not Allowed');

    return user;
  }
}
