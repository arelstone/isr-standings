import { Season } from 'src/season/season.entity';
import { Track } from 'src/track/track.entity';
import { CreateRaceInput } from '../create-race.input';

export class CreateRaceDto extends CreateRaceInput {
  season!: Season;
  track!: Track;
}
