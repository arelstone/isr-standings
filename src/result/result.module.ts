import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultResolver } from './result.resolver';

@Module({
  providers: [ResultService, ResultResolver]
})
export class ResultModule {}
