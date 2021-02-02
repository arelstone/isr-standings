import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [AuthService, AuthResolver],
  imports: [TypeOrmModule.forFeature([User]), UserService],
})
export class AuthModule {}
