import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Track } from './track.entity';
import { TrackService } from './track.service';
import { CreateTrackInput } from './create-track.input';
@Resolver(Track)
export class TrackResolver {
  constructor(private readonly trackService: TrackService) {}

  @Mutation(() => Track)
  async createTrack(@Args('input') input: CreateTrackInput): Promise<Track> {
    return await this.trackService.create(input);
  }
}
