import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { User } from './user.entity';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
