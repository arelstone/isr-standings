import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Result } from 'src/result/result.entity';
import { Season } from 'src/season/season.entity';
import { Track } from 'src/track/track.entity';
import { Race } from './race.entity';

@Resolver(Race)
export class RaceResolver {
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
