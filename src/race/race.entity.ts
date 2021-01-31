import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Season } from 'src/season/season.entity';
import { Standings } from 'src/standings/standings.entity';
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
export class Race {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field({ description: 'The title of the race' })
  title!: string;

  @ManyToOne((type) => Season, (season) => season.races, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  season: Promise<Season>;

  @OneToMany(() => Standings, (standings) => standings.race, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  standings: Promise<Standings[]>;

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
