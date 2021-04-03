import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Track } from './track.entity';
import { TrackService } from './track.service';
import { CreateTrackInput } from './create-track.input';
import { UpdateTrackInput } from './update-track.input';
import { GameEnum } from '../enums/GameEnum';

@Resolver(Track)
export class TrackResolver {
  constructor(private readonly trackService: TrackService) {}

  @Query(() => [Track])
  async tracks(@Args('game') game: GameEnum): Promise<Track[]> {
    return this.trackService.allByGame(game);
  }

  @Mutation(() => Track)
  async createTrack(@Args('input') input: CreateTrackInput): Promise<Track> {
    return await this.trackService.create(input);
  }

  @Mutation(() => Track)
  async deleteTrack(@Args('id') id: number): Promise<Track> {
    return await this.trackService.remove(id);
  }

  @Mutation(() => Track)
  async updateTrack(
    @Args('id') id: number,
    @Args('input') input: UpdateTrackInput,
  ): Promise<Track> {
    return await this.trackService.update(id, input);
  }
}
