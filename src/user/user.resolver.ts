import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async hello() {
    return 'hello world';
  }

  @Query(() => User)
  async user(
    @Args({
      name: 'id',
      type: () => String,
      nullable: false,
      description: 'The ID of the user',
    })
    id: string,
  ) {
    return this.userService.find(id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.store(input);
  }
}
