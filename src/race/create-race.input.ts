import { Field, InputType } from '@nestjs/graphql';
import { CarCategoryEnum } from 'src/enums/CarCategoryEnum';

@InputType()
export class CreateRaceInput {
  @Field()
  description!: string;

  @Field()
  startingAt!: Date;

  @Field()
  raceDuration!: number;

  @Field()
  qualifyingDuration!: number;

  @Field()
  seasonId!: number;

  @Field()
  trackId!: number;

  @Field({ defaultValue: CarCategoryEnum.GT3 })
  carCatrgory!: CarCategoryEnum;
}
