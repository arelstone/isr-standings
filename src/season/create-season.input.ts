import { Field, InputType } from '@nestjs/graphql';
import { GameEnum } from '../enums/GameEnum';

@InputType()
export class CreateSeasonInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  game!: GameEnum;
}
