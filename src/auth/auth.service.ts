import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginObject } from './login.object';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async validate(username: string, password: string): Promise<LoginObject> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new NotFoundException();
    }

    if (password !== user.password) {
      throw new UnauthorizedException();
    }

    return {
      ...user,
      token: 'mySecretToken',
    };
  }
}
