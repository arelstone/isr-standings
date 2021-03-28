import { Field, ObjectType } from '@nestjs/graphql';
import { GameEnum } from 'src/enums/GameEnum';

@ObjectType()
export class CreateSeasonPayload {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  game!: GameEnum;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
