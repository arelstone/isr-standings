import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

@ObjectType()
export class LoginObject extends User {
  token!: string;
}
