import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateResultInput {
  @Field({ nullable: true })
  player?: string;

  @Field({ nullable: true })
  points?: number;

  @Field({ nullable: true })
  polePosition?: boolean;

  @Field({ nullable: true })
  fastestLap?: boolean;

  @Field({ nullable: true })
  bestTime?: string;

  @Field({ nullable: true })
  totalTime?: string;
}
