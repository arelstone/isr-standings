import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  find = async (id: string): Promise<User> => {
    const user = this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  };

  store = async (input: Partial<User>): Promise<User> => {
    const user = await this.usersRepository.save(input);
    if (!user) {
      throw new Error();
    }

    return user;
  };
}
