import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Season } from 'src/season/season.entity';
import { Repository } from 'typeorm';
import { Race } from './race.entity';

@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(Race) private readonly raceRepository: Repository<Race>,
  ) {}

  async findAllBySeason(season: Season): Promise<Race[]> {
    return await this.raceRepository.find({ where: { season } });
  }
}
