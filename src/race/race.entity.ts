import { Field, ID, ObjectType } from '@nestjs/graphql';
import { race } from 'rxjs';
import { Season } from 'src/season/season.entity';
import { Track } from 'src/track/track.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Race {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @ManyToOne((type) => Season, (season) => season.races)
  season: Promise<Season>;

  @ManyToOne((type) => Track, (track) => track.races)
  track: Promise<Track>;
}
