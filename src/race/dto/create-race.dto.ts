import { Season } from '../../season/season.entity';
import { Track } from '../../track/track.entity';
import { CreateRaceInput } from '../create-race.input';

export class CreateRaceDto extends CreateRaceInput {
  season!: Season;
  track!: Track;
}
