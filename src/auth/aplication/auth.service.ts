import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../domain/user.model';
import { PayloadToken } from '../domain/token.model';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const users: User[] = [
      {
        username: 'renato',
        password: '123456',
        role: 'usuario',
        id: 1,
      },
    ];
    const user: User = users.find(
      (x) => x.username === username && x.password === password,
    );

    if (user) return user;

    return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
