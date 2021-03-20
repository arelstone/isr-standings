import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceResolver } from './race.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Race } from './race.entity';

@Module({
  providers: [RaceService, RaceResolver],
  imports: [TypeOrmModule.forFeature([Race])],
})
export class RaceModule {}
