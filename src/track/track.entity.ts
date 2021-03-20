import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GameEnum } from 'src/enums/GameEnum';
import { Race } from 'src/race/race.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Track {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  name!: string;

  @Column({ type: 'enum', enum: GameEnum, default: GameEnum.GT_SPORT })
  @Field()
  game!: GameEnum;

  @Column({ nullable: true })
  @Field()
  country: string;

  @OneToMany(() => Race, (race) => race.track)
  races: Promise<Race[]>;
}
