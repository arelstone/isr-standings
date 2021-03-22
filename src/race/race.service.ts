import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Season } from 'src/season/season.entity';
import { Repository } from 'typeorm';
import { Race } from './race.entity';

type RaceRepository = Repository<Race>;

@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(Race)
    private readonly raceRepository: RaceRepository,
  ) {}

  async find(race: Race): Promise<Race> {
    return await this.raceRepository.findOne({ where: { id: race.id } });
  }

  async findBySeason(season: Season): Promise<Race[]> {
    return await this.raceRepository.find({ where: { season } });
  }
}
