import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GameEnum } from 'src/enums/GameEnum';
import { Race } from 'src/race/race.entity';
import { RaceService } from 'src/race/race.service';
import { CreateSeasonInput } from './create-season.input';
import { Season } from './season.entity';
import { SeasonService } from './season.service';
import { UpdateSeasonInput } from './update-season.input';

@Resolver(Season)
export class SeasonResolver {
  constructor(
    private readonly seasonService: SeasonService,
    private readonly raceService: RaceService,
  ) {}

  @Query(() => [Season])
  async seasons(
    @Args('game', { nullable: true }) game: GameEnum,
  ): Promise<Season[]> {
    return this.seasonService.all(game);
  }

  @Query(() => Season)
  async season(@Args('id') id: string): Promise<Season> {
    return this.seasonService.find(id);
  }

  @Mutation(() => Season)
  async createSeason(@Args('input') input: CreateSeasonInput): Promise<Season> {
    return await this.seasonService.create(input);
  }

  @Mutation(() => Season)
  async updateSeason(
    @Args('id') id: string,
    @Args('input') input: UpdateSeasonInput,
  ): Promise<Season> {
    return await this.seasonService.update(id, input);
  }

  @Mutation(() => Season)
  async deleteSeason(@Args('id') id: string): Promise<Season> {
    return await this.seasonService.remove(id);
  }

  @ResolveField('races', () => [Race])
  async races(@Parent() season: Season) {
    return this.raceService.findBySeason(season);
  }
}
