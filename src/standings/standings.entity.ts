import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Race } from 'src/race/race.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Standings {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field({ description: 'The username' })
  username!: string;

  @Column()
  @Field({ description: 'Number of points that the user got in the race' })
  points!: number;

  @ManyToOne((type) => Race, (race) => race.standings, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  race: Promise<Race>;

  @CreateDateColumn()
  @Field({ description: 'The date that the entity was created' })
  createdAt!: Date;

  @UpdateDateColumn()
  @Field({ description: 'The date that the entity was updated' })
  updatedAt!: Date;

  @DeleteDateColumn()
  @Field({
    nullable: true,
    description: 'The date that the entity was updated deleted',
  })
  deletedAt?: Date;
}
