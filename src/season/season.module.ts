import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Race } from 'src/race/race.entity';
import { RaceService } from 'src/race/race.service';
import { Track } from 'src/track/track.entity';
import { TrackService } from 'src/track/track.service';
import { Season } from './season.entity';
import { SeasonResolver } from './season.resolver';
import { SeasonService } from './season.service';

@Module({
  providers: [SeasonService, SeasonResolver, TrackService, RaceService],
  imports: [TypeOrmModule.forFeature([Season, Track, Race])],
})
export class SeasonModule {}
