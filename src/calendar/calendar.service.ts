import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calendar } from './calendar.entity';
import { CreateCalendarInput } from './create-calendar.input';

type CalendarRepository = Repository<Calendar>;

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private readonly calendarRepository: CalendarRepository,
  ) {}

  async all(): Promise<Calendar[]> {
    return (await this.calendarRepository.find()).sort(
      (a, b) => a.dayOfWeek - b.dayOfWeek,
    );
  }

  async create(input: CreateCalendarInput): Promise<Calendar> {
    return await this.calendarRepository.save(input);
  }
}
