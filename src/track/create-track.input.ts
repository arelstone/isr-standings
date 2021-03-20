import { Field, InputType } from '@nestjs/graphql';
import { GameEnum } from 'src/enums/GameEnum';

@InputType()
export class CreateTrackInput {
  @Field()
  name!: string;

  @Field()
  game!: GameEnum;
}
