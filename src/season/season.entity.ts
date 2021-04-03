import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GameEnum } from '../enums/GameEnum';
import { Race } from '../race/race.entity';
import { User } from '../user/user.entity';
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

  @Column()
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

  @OneToMany(() => Race, (race) => race.season, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @Field(() => [Race])
  races: Race[];

  @ManyToOne(() => User, (user) => user.hosting, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  host!: User;
}
