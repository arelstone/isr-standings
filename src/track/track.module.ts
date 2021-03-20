import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { TrackResolver } from './track.resolver';
import { TrackService } from './track.service';

@Module({
  providers: [TrackResolver, TrackService],
  imports: [TypeOrmModule.forFeature([Track])],
})
export class TrackModule {}
