import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  find = async (id: string): Promise<User> => {
    const user = this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  };

  async findByUsername(username: string): Promise<User> {
    const user = this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  store = async (input: Partial<User>): Promise<User> => {
    const user = await this.userRepository.save(input);
    if (!user) {
      throw new Error();
    }

    return user;
  };
}
