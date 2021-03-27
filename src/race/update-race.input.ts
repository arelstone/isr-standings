import { Field, InputType } from '@nestjs/graphql';
import { CarCategoryEnum } from 'src/enums/CarCategoryEnum';

@InputType()
export class UpdateRaceInput {
  @Field()
  description?: string;

  @Field()
  startingAt?: Date;

  @Field()
  raceDuration?: number;

  @Field()
  qualifyingDuration?: number;

  @Field()
  trackId?: string;

  @Field()
  carCatrgory?: CarCategoryEnum;
}
