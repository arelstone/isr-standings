import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { JwtService as NestJwtService } from '@nestjs/jwt';

const secret = 'verySecretKey';

@Injectable()
export class JwtService {
  static secret = secret;

  constructor(private readonly jwt: NestJwtService) {}

  sign(user: Omit<User, 'password'>): string {
    return this.jwt.sign(user);
  }
}
