import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Standings } from './standings.entity';
import { StandingsService } from './standings.service';
import { StandingsResolver } from './standings.resolver';
import { Race } from 'src/race/race.entity';
import { RaceService } from 'src/race/race.service';

@Module({
  imports: [TypeOrmModule.forFeature([Standings, Race])],
  providers: [StandingsService, StandingsResolver, RaceService],
})
export class StandingsModule {}
