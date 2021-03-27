import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CarCategoryEnum } from 'src/enums/CarCategoryEnum';
import { Result } from 'src/result/result.entity';
import { Season } from 'src/season/season.entity';
import { Track } from 'src/track/track.entity';
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
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id!: string;

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

  @ManyToOne(() => Track, (track) => track.races)
  track: Promise<Track>;

  @ManyToOne(() => Season, (season) => season.races)
  season: Promise<Season>;

  @OneToMany(() => Result, (result) => result.race)
  results!: Promise<Result[]>;
}
