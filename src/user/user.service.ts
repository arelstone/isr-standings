import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupInput } from '../auth/signup.input';
import { User } from './user.entity';

type UserRepository = Repository<User>;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async findByKey(key: keyof User, value: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { [key]: value } });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async exists(email: string): Promise<boolean> {
    return (
      (await this.userRepository.findAndCount({ where: { email } })).length < 0
    );
  }

  async create(input: SignupInput): Promise<User> {
    return await this.userRepository.save(input);
  }
}
