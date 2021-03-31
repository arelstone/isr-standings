import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEnum } from 'src/enums/GameEnum';
import { RaceService } from 'src/race/race.service';
import { TrackService } from 'src/track/track.service';
import { patch } from 'src/utils/databaseUtils';
import { Repository } from 'typeorm';
import { CreateSeasonInput } from './create-season.input';
import { Season } from './season.entity';
import { UpdateSeasonInput } from './update-season.input';

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

  // TODO: Finish this
  async create(input: CreateSeasonInput): Promise<Season> {
    return await this.seasonRepository.save(input);
    // const tracks = await this.trackService.randomizeTracksForSeason(input);
    // const races = tracks.map(
    //   async (track) => await this.raceService.create({ track, season }),
    // );
    // return season;
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
