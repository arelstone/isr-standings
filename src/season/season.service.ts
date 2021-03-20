import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RaceService } from 'src/race/race.service';
import { TrackService } from 'src/track/track.service';
import { Repository } from 'typeorm';
import { CreateSeasonInput } from './create-season.input';
import { Season } from './season.entity';

type SeasonRepository = Repository<Season>;

@Injectable()
export class SeasonService {
  constructor(
    @InjectRepository(Season)
    private readonly seasonRepository: SeasonRepository,
    private readonly trackService: TrackService,
    private readonly raceService: RaceService,
  ) {}

  async find(id: string): Promise<Season> {
    const season = this.seasonRepository.findOne({ where: { id } });

    if (!season) {
      throw new NotFoundException();
    }

    return season;
  }

  async create(input: CreateSeasonInput): Promise<Season> {
    const season = await this.seasonRepository.save({ ...input });
    const tracks = await this.trackService.randomizeTracksForSeason(input);
    const races = tracks.map(
      async (track) => await this.raceService.create({ track, season }),
    );
    return season;
  }
}
