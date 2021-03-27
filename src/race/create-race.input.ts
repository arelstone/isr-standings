import { Field, InputType } from '@nestjs/graphql';
import { CarCategoryEnum } from 'src/enums/CarCategoryEnum';

@InputType()
export class CreateRaceInput {
  @Field()
  description!: string;

  @Field({ defaultValue: new Date() })
  startingAt!: Date;

  @Field()
  raceDuration!: number;

  @Field()
  qualifyingDuration!: number;

  @Field({ defaultValue: CarCategoryEnum.GT3 })
  carCatrgory!: CarCategoryEnum;
}
