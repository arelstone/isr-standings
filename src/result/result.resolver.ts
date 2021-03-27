import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Race } from 'src/race/race.entity';
import { RaceService } from 'src/race/race.service';
import { CreateResultInput } from './create-result.input';
import { Result } from './result.entity';
import { ResultService } from './result.service';

@Resolver(Result)
export class ResultResolver {
  constructor(
    private readonly resultService: ResultService,
    private readonly raceService: RaceService,
  ) {}

  @Mutation(() => Race)
  async createResults(
    @Args('raceId') raceId: string,
    @Args('input') input: CreateResultInput,
  ): Promise<Race> {
    const race = await this.raceService.find(raceId);
    await this.resultService.create({ race, ...input });

    return await this.raceService.find(raceId);
  }
}
