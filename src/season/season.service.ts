import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSeasonInput } from './create-season.input';
import { Season } from './season.entity';

type SeasonRepository = Repository<Season>;

@Injectable()
export class SeasonService {
  constructor(
    @InjectRepository(Season)
    private readonly seasonRepository: SeasonRepository,
  ) {}

  async find(id: string): Promise<Season> {
    const season = this.seasonRepository.findOne({ where: { id } });

    if (!season) {
      throw new NotFoundException();
    }

    return season;
  }

  async create(input: CreateSeasonInput): Promise<Season> {
    return this.seasonRepository.save(input);
  }

  //   async remove(id: string): Promise<boolean> {
  //     const season = this.seasonRepository.findOne({ where: { id } });

  //     if (!season) {
  //       throw new NotFoundException();
  //     }

  //     return this.seasonRepository.remove(season);
  //   }
}
