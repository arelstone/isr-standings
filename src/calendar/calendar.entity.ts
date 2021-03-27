import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GameEnum } from 'src/enums/GameEnum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Calendar {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id!: string;

  @Column('integer')
  @Field({ description: 'Starting at Monday' })
  dayOfWeek!: number;

  @Column()
  @Field()
  host!: string;

  @Column('time without time zone')
  @Field()
  time!: string;

  @Column({ default: 'Europe/England' })
  @Field()
  timezone!: string;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt!: Date;

  @Field({ nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ type: 'enum', enum: GameEnum, default: GameEnum.GT_SPORT })
  @Field()
  game!: GameEnum;
}
