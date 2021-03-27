import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceResolver } from './race.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Race } from './race.entity';
import { TrackService } from 'src/track/track.service';
import { Track } from 'src/track/track.entity';
import { Result } from 'src/result/result.entity';
import { SeasonService } from 'src/season/season.service';
import { Season } from 'src/season/season.entity';

@Module({
  providers: [RaceService, RaceResolver, TrackService, SeasonService],
  imports: [TypeOrmModule.forFeature([Race, Track, Result, Season])],
})
export class RaceModule {}
