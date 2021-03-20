import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Race } from 'src/race/race.entity';
import { RaceService } from 'src/race/race.service';
import { CreateSeasonInput } from './create-season.input';
import { Season } from './season.entity';
import { SeasonService } from './season.service';

@Resolver(Season)
export class SeasonResolver {
  constructor(
    private readonly seasonService: SeasonService,
    private readonly raceService: RaceService,
  ) {}

  @Query(() => Season)
  async season(
    @Args({ name: 'id', type: () => String })
    id: string,
  ) {
    return this.seasonService.find(id);
  }

  @Mutation(() => Season)
  async createSeason(@Args('input') input: CreateSeasonInput): Promise<Season> {
    return await this.seasonService.create(input);
  }

  @ResolveField('races', (returns) => [Race])
  async races(@Parent() season: Season) {
    return this.raceService.findBySeason(season);
  }
}
