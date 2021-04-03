import { Field, ObjectType } from '@nestjs/graphql';
import { Season } from '../season/season.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  @Field()
  psnHandle!: string;

  @Column({ nullable: true })
  @Field()
  name?: string;

  @Column('boolean', { default: false })
  @Field()
  isAdmin!: boolean;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt!: Date;

  @OneToMany(() => Season, (season) => season.host, { lazy: true })
  @Field(() => [Season])
  hosting?: Season[];
}
