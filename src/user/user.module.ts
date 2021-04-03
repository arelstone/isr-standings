import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { SeasonModule } from '../season/season.module';

@Module({
  providers: [UserService, UserResolver],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    SeasonModule,
  ],
  exports: [UserService],
})
export class UserModule {}
