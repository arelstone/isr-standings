import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Race } from 'src/race/race.entity';
import { RaceService } from 'src/race/race.service';
import { Standings } from 'src/standings/standings.entity';
import { StandingsService } from 'src/standings/standings.service';
import { Season } from './season.entity';
import { SeasonResolver } from './season.resolver';
import { SeasonService } from './season.service';

@Module({
  providers: [SeasonService, SeasonResolver, RaceService, StandingsService],
  imports: [TypeOrmModule.forFeature([Season, Race, Standings])],
})
export class SeasonModule {}
