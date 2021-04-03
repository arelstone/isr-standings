import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { JwtService as NestJwtService } from '@nestjs/jwt';

const secret = 'verySecretKey';

@Injectable()
export class JwtService {
  static secret = secret;

  constructor(private readonly jwt: NestJwtService) {}

  sign(user: Omit<Partial<User>, 'password'>): string {
    return this.jwt.sign(user);
  }
}
