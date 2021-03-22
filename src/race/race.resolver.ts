import { Args, Parent, ResolveField, Resolver, Query } from '@nestjs/graphql';
import { Season } from 'src/season/season.entity';
import { Track } from 'src/track/track.entity';
import { TrackService } from 'src/track/track.service';
import { Race } from './race.entity';
import { RaceService } from './race.service';

@Resolver(Race)
export class RaceResolver {
  constructor(
    private readonly raceService: RaceService,
    private readonly trackService: TrackService,
  ) {}

  @Query(() => Race)
  async race(@Args('id') id: string): Promise<Race> {
    return await this.raceService.find({ id } as Race);
  }

  @ResolveField(() => Track)
  async track(@Parent() race: Race) {
    return await race.track;
  }

  @ResolveField(() => Season)
  async season(@Parent() race: Race) {
    return await race.season;
  }
}
