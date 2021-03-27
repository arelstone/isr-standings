import { Field, InputType } from '@nestjs/graphql';
import { GameEnum } from 'src/enums/GameEnum';

@InputType()
export class CreateCalendarInput {
  @Field({ nullable: false })
  dayOfWeek!: number;

  @Field({ nullable: false })
  host!: string;

  @Field({ nullable: false })
  time!: string;

  @Field({ nullable: false })
  timezone!: string;

  @Field({ defaultValue: GameEnum.GT_SPORT })
  game!: GameEnum;
}
