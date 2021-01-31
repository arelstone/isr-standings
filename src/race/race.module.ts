import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Standings } from 'src/standings/standings.entity';
import { StandingsService } from 'src/standings/standings.service';
import { Race } from './race.entity';
import { RaceResolver } from './race.resolver';
import { RaceService } from './race.service';

@Module({
  imports: [TypeOrmModule.forFeature([Race, Standings])],
  providers: [RaceService, RaceResolver, StandingsService],
})
export class RaceModule {}
