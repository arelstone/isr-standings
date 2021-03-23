import { CreateResultInput } from 'src/result/create-result.input';
import { Race } from '../race.entity';

export class CreateResultDTO extends CreateResultInput {
  race!: Race;
}
