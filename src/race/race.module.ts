import { forwardRef, Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceResolver } from './race.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Race } from './race.entity';
import { SeasonModule } from '../season/season.module';
import { TrackModule } from '../track/track.module';
import { ResultModule } from '../result/result.module';

@Module({
  providers: [RaceService, RaceResolver],
  imports: [
    TypeOrmModule.forFeature([Race]),
    TrackModule,
    forwardRef(() => SeasonModule),
    forwardRef(() => ResultModule),
  ],
  exports: [RaceService],
})
export class RaceModule {}
