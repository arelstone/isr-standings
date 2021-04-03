import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceModule } from '../race/race.module';
import { TrackModule } from '../track/track.module';
import { Season } from './season.entity';
import { SeasonResolver } from './season.resolver';
import { SeasonService } from './season.service';

@Module({
  providers: [SeasonService, SeasonResolver],
  imports: [
    TypeOrmModule.forFeature([Season]),
    TrackModule,
    forwardRef(() => RaceModule),
  ],
  exports: [SeasonService],
})
export class SeasonModule {}
