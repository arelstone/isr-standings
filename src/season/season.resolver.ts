import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GameEnum } from '../enums/GameEnum';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { AuthGuard } from '../shared/guards/auth.guard';
import { User } from '../user/user.entity';
import { CreateSeasonInput } from './create-season.input';
import { Season } from './season.entity';
import { SeasonService } from './season.service';
import { UpdateSeasonInput } from './update-season.input';

@Resolver(Season)
export class SeasonResolver {
  constructor(private readonly seasonService: SeasonService) {}

  @Query(() => [Season])
  async seasons(
    @Args('game', { nullable: true }) game: GameEnum,
  ): Promise<Season[]> {
    return this.seasonService.all(game);
  }

  @Query(() => Season)
  async season(@Args('id') id: number): Promise<Season> {
    return this.seasonService.find(id);
  }

  @Mutation(() => Season)
  @UseGuards(AuthGuard)
  async createSeason(
    @Args('input') input: CreateSeasonInput,
    @CurrentUser() user: User,
  ): Promise<Season> {
    return await this.seasonService.create({ ...input, host: user });
  }

  @Mutation(() => Season)
  @UseGuards(AuthGuard)
  async updateSeason(
    @Args('id') id: number,
    @Args('input') input: UpdateSeasonInput,
    @CurrentUser() user: User,
  ): Promise<Season> {
    const season = await this.seasonService.find(id);

    if (season.host.id !== user.id) {
      throw new UnprocessableEntityException('You did not create the season');
    }

    return await this.seasonService.update(season, input);
  }

  @Mutation(() => Season)
  @UseGuards(AuthGuard)
  async deleteSeason(
    @Args('id') id: number,
    @CurrentUser() user: User,
  ): Promise<string> {
    const season = await this.seasonService.find(id);

    if (season.host.id !== user.id) {
      throw new UnprocessableEntityException('You did not create the season');
    }
    return await this.seasonService.remove(id);
  }
}
