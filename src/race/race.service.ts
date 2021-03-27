import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Season } from 'src/season/season.entity';
import { patch } from 'src/utils/databaseUtils';
import { Repository } from 'typeorm';
import { CreateRaceDto } from './dto/create-race.dto';
import { Race } from './race.entity';
import { UpdateRaceInput } from './update-race.input';

type RaceRepository = Repository<Race>;

@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(Race)
    private readonly raceRepository: RaceRepository,
  ) {}

  async find(id: string): Promise<Race> {
    return await this.raceRepository.findOne({ where: { id } });
  }

  async update(race: Race, input: UpdateRaceInput): Promise<Race> {
    return this.raceRepository.save(patch(race, input));
  }

  async findBySeason(season: Season): Promise<Race[]> {
    return await this.raceRepository.find({ where: { season } });
  }

  async create(data: CreateRaceDto): Promise<Race> {
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

  async remove(id: string): Promise<string> {
    const race = this.raceRepository.findOne({ where: { id } });

    if (!race) {
      throw new NotFoundException();
    }

    await this.raceRepository.softDelete(id);

    return 'Deleted';
  }
}
