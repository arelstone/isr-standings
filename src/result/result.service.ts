import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRaceInput } from 'src/race/create-race.input';
import { Race } from 'src/race/race.entity';
import { RaceService } from 'src/race/race.service';
import { patch } from 'src/utils/databaseUtils';
import { Connection, Repository } from 'typeorm';
import { CreateResultInput } from './create-result.input';
import { Result } from './result.entity';
import { UpdateResultInput } from './update-result.input';

type ResultRepository = Repository<Result>;
@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: ResultRepository,
  ) {}

  async find(id: number): Promise<Result> {
    const result = await this.resultRepository.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async create(race: Race, input: CreateResultInput): Promise<Result> {
    return await this.resultRepository.save({ race, ...input });
  }

  async update(result: Result, input: UpdateResultInput): Promise<Result> {
    return await this.resultRepository.save(patch(result, input));
  }

  async remove(id: number): Promise<string> {
    const result = await this.resultRepository.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException();
    }

    await this.resultRepository.softDelete(id);

    return 'Deleted';
  }
}
