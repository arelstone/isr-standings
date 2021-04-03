import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEnum } from '../enums/GameEnum';
import { RaceService } from '../race/race.service';
import { TrackService } from '../track/track.service';
import { patch } from '../shared/utils/database.utils';
import { Repository } from 'typeorm';
import { Season } from './season.entity';
import { UpdateSeasonInput } from './update-season.input';
import { CreateSeasonDto } from './create-season.dto';

type SeasonRepository = Repository<Season>;
@Injectable()
export class SeasonService {
  constructor(
    @InjectRepository(Season)
    private readonly seasonRepository: SeasonRepository,
    private readonly trackService: TrackService,
    private readonly raceService: RaceService,
  ) {}

  async all(game?: GameEnum): Promise<Season[]> {
    const seasons = !!game
      ? this.seasonRepository.find({ where: { game } })
      : this.seasonRepository.find();

    if (!seasons) {
      throw new NotFoundException();
    }

    return seasons;
  }

  async find(id: number): Promise<Season> {
    const season = this.seasonRepository.findOne({ where: { id } });

    if (!season) {
      throw new NotFoundException();
    }

    return season;
  }

  async create(input: CreateSeasonDto): Promise<Season> {
    return await this.seasonRepository.save(input);
  }

  async update(season: Season, input: UpdateSeasonInput): Promise<Season> {
    return await this.seasonRepository.save(patch(season, input));
  }

  async remove(id: number): Promise<string> {
    const season = await this.seasonRepository.findOne({ where: { id } });

    if (!season) {
      throw new NotFoundException();
    }

    await this.seasonRepository.softDelete(id);

    return 'Deleted';
  }
}
