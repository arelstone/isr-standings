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
import { User } from 'src/user/user.entity';
import { getManager } from 'typeorm';
import { CreateSeasonInput } from './create-season.input';
import { Season } from './season.entity';
import { SeasonService } from './season.service';

type SeasonalStandings = {
  username: User['name'];
  points: number;
};
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

  @ResolveField((returns) => String)
  async standings(@Parent() season) {
    // FIXME: should result of `standingsForSeason`
    // this.standingsService.standingsForSeason(season);

    const s = await getManager().query(`
      SELECT
        standings."username",
        SUM(standings."points") as points
      FROM standings 
      INNER JOIN race ON standings."raceId"=race."id"
      INNER JOIN season ON race."seasonId"=season."id"
      WHERE season."id"=${season.id}
      GROUP BY standings."username"
      ORDER BY points DESC
    `);
    console.log(s);

    return 'HELLO WORLD';
  }
}
