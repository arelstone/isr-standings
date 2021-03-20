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
import { StandingsService } from 'src/standings/standings.service';
import { getManager } from 'typeorm';
import { CreateSeasonInput } from './create-season.input';
import { Season } from './season.entity';
import { SeasonService } from './season.service';

@Resolver(Season)
export class SeasonResolver {
  constructor(
    private readonly seasonService: SeasonService,
    private readonly raceService: RaceService,
    private readonly standingsService: StandingsService,
  ) {}

  @Query(() => Season)
  async season(
    @Args({
      name: 'id',
      type: () => String,
      nullable: false,
      description: 'The ID of the season',
    })
    id: string,
  ) {
    return this.seasonService.find(id);
  }

  @Mutation(() => Season)
  async createSeason(@Args('input') input: CreateSeasonInput): Promise<Season> {
    return await this.seasonService.create(input);
  }

  @ResolveField((returns) => [Race])
  async races(@Parent() season) {
    return this.raceService.findAllBySeason(season);
  }
}
