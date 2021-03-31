import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GameEnum } from 'src/enums/GameEnum';
import { Race } from 'src/race/race.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Season {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ unique: true })
  @Field()
  name!: string;

  @Column({ type: 'enum', enum: GameEnum, default: GameEnum.GT_SPORT })
  @Field()
  game!: GameEnum;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt!: Date;

  @Field({ nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Race, (race) => race.season, { eager: true })
  races: Race[];
}
