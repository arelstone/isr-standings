import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from './jwt.service';

@Module({
  providers: [AuthService, AuthResolver, JwtStrategy],
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: JwtService.secret,
      signOptions: {
        expiresIn: '365d',
      },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
