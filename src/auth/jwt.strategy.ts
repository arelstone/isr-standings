import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';

const extractToken = (req: Request): string | null => {
  const authorization = req.header('authorization') ?? null;
  const [, token] = authorization.split('Bearer ');

  return token ?? null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: extractToken,
      secretOrKey: JwtService.secret,
    });
  }

  validate(payload) {
    return this.authService.validate(payload);
  }
}
