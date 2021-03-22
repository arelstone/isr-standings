import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Season } from 'src/season/season.entity';
import { Track } from 'src/track/track.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn, Index } from 'typeorm';

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
}
