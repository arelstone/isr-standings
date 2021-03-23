import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Race } from 'src/race/race.entity';
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
  Column,
} from 'typeorm';

@Entity()
@ObjectType()
@Index(['player', 'race'], { unique: true })
export class Result {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  player!: string;

  @Column('integer')
  @Field()
  points!: number;

  @ManyToOne(() => Race, (race) => race.results)
  race!: Promise<Race>;

  @Column('boolean', { default: false })
  @Field({ defaultValue: false })
  polePosition!: boolean;

  @Column('boolean', { default: false })
  @Field({ defaultValue: false })
  fastestLap!: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bestTime: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  totalTime: string;
}
