import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSeasonInput {
  @Field()
  name!: string;

  @Field()
  description!: string;
}
