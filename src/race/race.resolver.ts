import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GameEnum } from 'src/enums/GameEnum';
import { Result } from 'src/result/result.entity';
import { Season } from 'src/season/season.entity';
import { SeasonService } from 'src/season/season.service';
import { Track } from 'src/track/track.entity';
import { TrackService } from 'src/track/track.service';
import { CreateRaceInput } from './create-race.input';
import { Race } from './race.entity';
import { RaceService } from './race.service';

@Resolver(Race)
export class RaceResolver {
  constructor(
    private readonly raceService: RaceService,
    private readonly seasonService: SeasonService,
    private readonly trackService: TrackService,
  ) {}

  @Mutation(() => Race)
  async createRace(
    @Args('seasonId') seasonId: string,
    @Args('trackId') trackId: string,
    @Args('input') input: CreateRaceInput,
  ): Promise<Race> {
    const season = await this.seasonService.find(seasonId);
    const track = await this.trackService.find(trackId);

    return await this.raceService.create({ ...input, season, track });
  }

  @ResolveField(() => Track)
  async track(@Parent() race: Race) {
    return await race.track;
  }

  @ResolveField(() => Season)
  async season(@Parent() race: Race) {
    return await race.season;
  }

  @ResolveField(() => [Result])
  async results(@Parent() race: Race) {
    return (await race.results).sort((a, b) => b.points - a.points);
  }
}
