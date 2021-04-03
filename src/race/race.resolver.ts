import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SeasonService } from '../season/season.service';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { AuthGuard } from '../shared/guards/auth.guard';
import { TrackService } from '../track/track.service';
import { User } from '../user/user.entity';
import { CreateRaceInput } from './create-race.input';
import { Race } from './race.entity';
import { RaceService } from './race.service';
import { UpdateRaceInput } from './update-race.input';

@Resolver(Race)
export class RaceResolver {
  constructor(
    private readonly raceService: RaceService,
    private readonly seasonService: SeasonService,
    private readonly trackService: TrackService,
  ) {}

  @Mutation(() => Race)
  @UseGuards(AuthGuard)
  async createRace(
    @Args('input') input: CreateRaceInput,
    @CurrentUser() currentUser: User,
  ): Promise<Race> {
    const season = await this.seasonService.find(input.seasonId);
    if (season.host.id !== currentUser.id) {
      throw new UnprocessableEntityException(
        'You create a race for a season you are not hosting',
      );
    }

    const track = await this.trackService.find(input.trackId);

    return await this.raceService.create(season, track, input);
  }

  @Mutation(() => Race)
  @UseGuards(AuthGuard)
  async updateRace(
    id: number,
    @Args('input') input: UpdateRaceInput,
    @CurrentUser() currentUser: User,
  ): Promise<Race> {
    const race = await this.raceService.find(id);

    if ((await race.season.host.id) !== currentUser.id) {
      throw new UnprocessableEntityException(
        'You cannot update this race because you are not the hosting the season',
      );
    }
    return await this.raceService.update(race, input);
  }

  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async deleteRace(
    @Args('id') id: number,
    @CurrentUser() currentUser: User,
  ): Promise<string> {
    const race = await this.raceService.find(id);
    if (race.season.host.id !== currentUser.id) {
      throw new UnprocessableEntityException(
        'You cannot delete this race because you are not the hosting the season',
      );
    }

    return await this.raceService.remove(id);
  }
}
