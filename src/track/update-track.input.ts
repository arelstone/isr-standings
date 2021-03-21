import { Field, InputType } from '@nestjs/graphql';
import { GameEnum } from 'src/enums/GameEnum';

@InputType()
export class UpdateTrackInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true, defaultValue: GameEnum.GT_SPORT })
  game!: GameEnum;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true, defaultValue: false })
  dlc: boolean;
}
