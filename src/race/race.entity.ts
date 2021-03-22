import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Result } from 'src/result/result.entity';
import { Season } from 'src/season/season.entity';
import { Track } from 'src/track/track.entity';
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity()
@ObjectType()
@Index(['track', 'season'], { unique: true })
export class Race {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Index()
  @ManyToOne(() => Track, (track) => track.races, { eager: true })
  track: Promise<Track>;

  @Index()
  @ManyToOne(() => Season, (season) => season.races)
  season: Promise<Season>;

  @OneToMany(() => Result, (result) => result.race)
  results!: Promise<Result[]>;
}
