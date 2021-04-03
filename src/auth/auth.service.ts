import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import * as bcryptjs from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validate({ id }): Promise<User> {
    const user = await this.userService.findByKey('id', id);

    if (!user) {
      throw Error('Authenticate validation error');
    }

    return user;
  }

  async hash(password: string): Promise<string> {
    return await bcryptjs.hash(password, 10);
  }

  async compare(password: string, user: User): Promise<boolean> {
    return await bcryptjs.compare(password, user.password);
  }
}
