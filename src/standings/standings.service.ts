import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Race } from 'src/race/race.entity';
import { Season } from 'src/season/season.entity';
import { Repository } from 'typeorm';
import { Standings } from './standings.entity';

@Injectable()
export class StandingsService {
  constructor(
    @InjectRepository(Standings)
    private readonly standingsRepository: Repository<Standings>,
    @InjectRepository(Race)
    private readonly raceRepository: Repository<Race>,
  ) {}

  async standingsForSeason(season: Season): Promise<Race[]> {
    // FIXME: should return correct standings for the provided season
    return season.races;
  }

  async standingsForRace(race: Race): Promise<Standings[]> {
    return await this.standingsRepository.find({
      where: { race },
      order: { points: 'DESC' },
    });
  }
}
