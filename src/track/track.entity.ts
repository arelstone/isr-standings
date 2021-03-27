import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GameEnum } from 'src/enums/GameEnum';
import { Race } from 'src/race/race.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  name!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: GameEnum, default: GameEnum.GT_SPORT })
  @Field()
  game!: GameEnum;

  @Column({ nullable: true })
  @Field({ nullable: true })
  country: string;

  @Column({ default: false, type: 'boolean' })
  @Field()
  dlc!: boolean;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt!: Date;

  @Field({ nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Race, (race) => race.track)
  races: Promise<Race[]>;
}
