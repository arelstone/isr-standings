import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from './user.entity';

@Resolver()
export class UserResolver {
  @Query(() => User)
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
