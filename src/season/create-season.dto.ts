import { User } from '../user/user.entity';
import { CreateSeasonInput } from './create-season.input';

export class CreateSeasonDto extends CreateSeasonInput {
  host!: User;
}
