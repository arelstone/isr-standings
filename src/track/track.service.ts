import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSeasonInput } from 'src/season/create-season.input';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateTrackInput } from './create-track.input';
import { Track } from './track.entity';

type TrackRepository = Repository<Track>;

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: TrackRepository,
  ) {}

  async create(input: CreateTrackInput): Promise<Track> {
    return this.trackRepository.save(input);
  }

  async randomizeTracksForSeason({
    game,
    numberOfRaces,
  }: Partial<CreateSeasonInput>): Promise<Track[]> {
    return await createQueryBuilder(Track, 'track')
      .where('track.game = :game', { game })
      .limit(numberOfRaces)
      .orderBy('RANDOM()')
      .getMany();
  }
}
