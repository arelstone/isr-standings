import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginInput } from './login.input';
import { SignupInput } from './signup.input';
import { JwtPayload } from './jwt.payload';
import { JwtService } from './jwt.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) {}

  @Query(() => JwtPayload)
  async login(
    @Args('input') { email, password }: LoginInput,
  ): Promise<JwtPayload> {
    const user = await this.userService.findByKey('email', email);

    if (!this.authService.compare(password, user)) {
      throw Error('Email or password incorrect');
    }

    return {
      user,
      token: this.jwt.sign({ id: user.id, email: user.email }),
    };
  }

  @Mutation(() => JwtPayload)
  async signup(@Args('input') input: SignupInput): Promise<JwtPayload> {
    if (await this.userService.exists(input.email)) {
      throw Error('Email is already in use');
    }
    const password = await this.authService.hash(input.password);
    const user = await this.userService.create({ ...input, password });

    return {
      user,
      token: this.jwt.sign({ id: user.id, email: user.email }),
    };
  }
}
