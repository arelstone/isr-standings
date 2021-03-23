import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultResolver } from './result.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './result.entity';
import { Race } from 'src/race/race.entity';
import { RaceService } from 'src/race/race.service';

@Module({
  providers: [ResultService, ResultResolver, RaceService],
  imports: [TypeOrmModule.forFeature([Race, Result])],
})
export class ResultModule {}
