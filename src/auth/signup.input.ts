import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignupInput {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  psnHandle!: string;

  @Field({ nullable: true })
  name?: string;
}
