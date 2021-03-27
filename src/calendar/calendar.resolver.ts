import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
} from '@nestjs/graphql';
import { Calendar } from './calendar.entity';
import { CalendarService } from './calendar.service';
import { CreateCalendarInput } from './create-calendar.input';
import * as moment from 'moment-timezone';

@Resolver(Calendar)
export class CalendarResolver {
  constructor(private readonly calendarService: CalendarService) {}

  @Query(() => [Calendar])
  async calendar(): Promise<Calendar[]> {
    return await this.calendarService.all();
  }

  @Mutation(() => [Calendar])
  async createCalendar(
    @Args('input') input: CreateCalendarInput,
  ): Promise<Calendar[]> {
    await this.calendarService.create(input);

    return await this.calendarService.all();
  }

  @ResolveField('next')
  nextRace(@Parent() { dayOfWeek, time, timezone }: Calendar): string {
    const date = moment().days(dayOfWeek);
    const [hours, minutes, seconds] = time.split(':');
    date.set('hours', Number(hours));
    date.set('minutes', Number(minutes));
    date.set('second', Number(seconds));
    date.tz(timezone).toDate();

    return `${date}`;
  }

  @ResolveField('day')
  day(@Parent() { dayOfWeek }: Calendar): string {
    return moment.weekdays()[dayOfWeek];
  }
}
