import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResultDTO } from 'src/race/dto/create-result.dto';
import { Repository } from 'typeorm';
import { Result } from './result.entity';

type ResultRepository = Repository<Result>;
@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: ResultRepository,
  ) {}

  async create(data: CreateResultDTO): Promise<void> {
    // FIXME: Why doesn't it save the race when parsing it
    // return await this.resultRepository.save(data);
  }

  async remove(id: string): Promise<string> {
    const result = await this.resultRepository.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException();
    }

    await this.resultRepository.softDelete(id);

    return 'Deleted';
  }
}
