import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CarCategoryEnum } from '../enums/CarCategoryEnum';
import { Result } from '../result/result.entity';
import { Season } from '../season/season.entity';
import { Track } from '../track/track.entity';
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Race {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column('timestamp with time zone')
  @Field()
  startingAt: Date;

  @Column('integer', { nullable: true })
  @Field({ description: 'Minutes', nullable: true })
  raceDuration: number;

  @Column('integer', { nullable: true })
  @Field({ description: 'Minutes', nullable: true })
  qualifyingDuration: number;

  @Column({ type: 'enum', enum: CarCategoryEnum, default: CarCategoryEnum.GT3 })
  @Field({ defaultValue: CarCategoryEnum.GT3 })
  carCategory!: CarCategoryEnum;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt!: Date;

  @Field({ nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Track, (track) => track.races, { lazy: true })
  @Field(() => Track)
  track: Track;

  @ManyToOne(() => Season, (season) => season.races, { lazy: true })
  @Field(() => Season)
  season: Season;

  @OneToMany(() => Result, (result) => result.race, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @Field(() => [Result])
  results!: Promise<Result[]>;
}
