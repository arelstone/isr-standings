import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.entity';

@ObjectType()
export class JwtPayload {
  @Field()
  token!: string;

  @Field()
  user!: User;
}
