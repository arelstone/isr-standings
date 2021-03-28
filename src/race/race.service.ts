import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Season } from 'src/season/season.entity';
import { Track } from 'src/track/track.entity';
import { patch } from 'src/utils/databaseUtils';
import { Repository } from 'typeorm';
import { CreateRaceInput } from './create-race.input';
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

  async find(id: number): Promise<Race> {
    return await this.raceRepository.findOne({ where: { id } });
  }

  async update(race: Race, input: UpdateRaceInput): Promise<Race> {
    return await this.raceRepository.save(patch(race, input));
  }

  async findBySeason(season: Season): Promise<Race[]> {
    const res = await this.raceRepository.find({ where: { season } });

    console.log('###findBySeason', res);
    return res;
  }

  async create(
    season: Season,
    track: Track,
    input: CreateRaceInput,
  ): Promise<Race> {
    return await this.raceRepository.save({ ...input, track, season });
  }

  async remove(id: number): Promise<string> {
    const race = this.raceRepository.findOne({ where: { id } });

    if (!race) {
      throw new NotFoundException();
    }

    await this.raceRepository.softDelete(id);

    return 'Deleted';
  }
}
