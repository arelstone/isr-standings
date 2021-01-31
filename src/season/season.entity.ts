import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Race } from 'src/race/race.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
@ObjectType()
export class Season {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field({ description: 'Name of the season' })
  name!: string;

  @Column()
  @Field({ description: 'Description of the season' })
  description!: string;

  @CreateDateColumn()
  @Field({ description: 'The date that the season was created' })
  createdAt!: Date;

  @UpdateDateColumn()
  @Field({ description: 'The date that the season was updated' })
  updatedAt!: Date;

  @DeleteDateColumn()
  @Field({
    nullable: true,
    description: 'The date that the season was removed',
  })
  deletedAt?: Date;

  @OneToMany(() => Race, (race) => race.season, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  races: Promise<Race[]>;
}
