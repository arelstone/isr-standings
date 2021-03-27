import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Season } from 'src/season/season.entity';
import { Repository } from 'typeorm';
import { CreateRaceDto } from './dto/create-race.dto';
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

  async create(data: CreateRaceDto): Promise<Race> {
    console.log(data);

    return await this.raceRepository.save({
      carCategory: data.carCatrgory,
      description: data.description,
      qualifyingDuration: data.qualifyingDuration,
      raceDuration: data.raceDuration,
      startingAt: data.startingAt,
      // season: [data.season],
      // track: data.track,
    });
  }
}
