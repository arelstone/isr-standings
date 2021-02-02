import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginObject } from './login.object';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginObject)
  async login(
    @Args({
      name: 'username',
      type: () => String,
      nullable: false,
    })
    username: string,
    @Args({
      name: 'password',
      type: () => String,
      nullable: false,
    })
    password: string,
  ): Promise<LoginObject> {
    return await this.authService.validate(username, password);
  }
}
