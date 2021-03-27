import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarResolver } from './calendar.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calendar } from './calendar.entity';

@Module({
  providers: [CalendarService, CalendarResolver],
  imports: [TypeOrmModule.forFeature([Calendar])],
})
export class CalendarModule {}
