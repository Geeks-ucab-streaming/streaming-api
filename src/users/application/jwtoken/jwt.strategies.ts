import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { jwtcontanst } from '../constants/jwt.constansts';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtcontanst.secret,
      ignoreExpiration: false,
    });
  }

  validate(payload) {
    //return { id: payload.id, name: payload.name, phone: payload.phone };
    return payload;
  }
}
