import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../shared/guards/auth.guard';
import { Race } from '../race/race.entity';
import { RaceService } from '../race/race.service';
import { CreateResultInput } from './create-result.input';
import { Result } from './result.entity';
import { ResultService } from './result.service';
import { UpdateResultInput } from './update-result.input';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { User } from '../user/user.entity';

@Resolver(Result)
export class ResultResolver {
  constructor(
    private readonly resultService: ResultService,
    private readonly raceService: RaceService,
  ) {}

  @Mutation(() => Race)
  @UseGuards(AuthGuard)
  async createResult(
    @Args('raceId') raceId: number,
    @Args('input') input: CreateResultInput,
    @CurrentUser() currentUser: User,
  ): Promise<Race> {
    const race = await this.raceService.find(raceId);

    if (
      (await (await race.season).host.id) !== currentUser.id ||
      currentUser.isAdmin
    ) {
      throw new UnprocessableEntityException(
        'You cannot add results for a season you are not hosting',
      );
    }

    await this.resultService.create(race, input);

    return await this.raceService.find(raceId);
  }

  @Mutation(() => Race)
  @UseGuards(AuthGuard)
  async updateResult(
    @Args('id') id: number,
    @Args('input') input: UpdateResultInput,
    @CurrentUser() currentUser: User,
  ): Promise<Race> {
    const result = await this.resultService.find(id);
    if (
      (await (await result.race.season).host.id) !== currentUser.id ||
      currentUser.isAdmin
    ) {
      throw new UnprocessableEntityException(
        'You cannot update results for a season you are not hosting',
      );
    }

    const updated = await this.resultService.update(result, input);

    return await updated.race;
  }
}
