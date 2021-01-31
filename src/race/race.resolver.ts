import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Standings } from 'src/standings/standings.entity';
import { StandingsService } from 'src/standings/standings.service';
import { Race } from './race.entity';

@Resolver(Race)
export class RaceResolver {
  constructor(private readonly standsingsService: StandingsService) {}

  @ResolveField((returns) => [Standings])
  async standings(@Parent() race) {
    return this.standsingsService.standingsForRace(race);
  }
}
