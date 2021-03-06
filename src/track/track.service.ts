import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEnum } from '../enums/GameEnum';
import { patch } from '../shared/utils/database.utils';
import { Repository } from 'typeorm';
import { CreateTrackInput } from './create-track.input';
import { Track } from './track.entity';
import { UpdateTrackInput } from './update-track.input';

type TrackRepository = Repository<Track>;

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: TrackRepository,
  ) {}

  async find(id: number): Promise<Track> {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  async allByGame(game: GameEnum): Promise<Track[]> {
    return await this.trackRepository.find({ where: { game } });
  }

  async create(input: CreateTrackInput): Promise<Track> {
    return this.trackRepository.save(input);
  }

  async update(id: number, input: UpdateTrackInput): Promise<Track> {
    const track = await this.trackRepository.findOneOrFail({ where: { id } });

    return await this.trackRepository.save(patch(track, input));
  }

  async remove(id: number): Promise<Track> {
    const season = await this.trackRepository.findOne({ where: { id } });

    if (!season) {
      throw new NotFoundException();
    }

    await this.trackRepository.softDelete(id);

    return await this.trackRepository.findOne({
      where: { id },
      withDeleted: true,
    });
  }

  // async randomizeTracksForSeason({
  //   game,
  //   numberOfRaces,
  // }: Partial<CreateSeasonInput>): Promise<Track[]> {
  //   return await createQueryBuilder(Track, 'track')
  //     .where('track.game = :game', { game })
  //     .limit(numberOfRaces)
  //     .orderBy('RANDOM()')
  //     .getMany();
  // }
}
