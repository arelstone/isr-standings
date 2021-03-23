import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateResultInput {
  @Field()
  player!: string;

  @Field()
  points!: number;

  @Field({ nullable: true, defaultValue: false })
  polePosition: boolean;

  @Field({ nullable: true, defaultValue: false })
  fastestLap: boolean;

  @Field({ nullable: true })
  bestTime: string;

  @Field({ nullable: true })
  totalTime: string;
}
