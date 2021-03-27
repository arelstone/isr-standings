import { forwardRef, Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultResolver } from './result.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './result.entity';
import { RaceModule } from 'src/race/race.module';

@Module({
  providers: [ResultService, ResultResolver],
  imports: [TypeOrmModule.forFeature([Result]), forwardRef(() => RaceModule)],
  exports: [ResultService],
})
export class ResultModule {}
