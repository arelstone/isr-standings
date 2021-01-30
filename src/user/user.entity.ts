import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  @Field(() => ID)
  id!: number;

  @Column()
  @Field({ description: 'The name of the user' })
  email!: string;

  @Column()
  @Field({ description: 'The email of the user' })
  name!: string;

  @CreateDateColumn()
  @Field({ description: 'The date that the user registered the account' })
  createdAt!: Date;

  @UpdateDateColumn()
  @Field({ description: 'The date that the user last updated their account' })
  updatedAt!: Date;

  @DeleteDateColumn()
  @Field({
    nullable: true,
    description: 'The date that the user deleted their account',
  })
  deletedAt?: Date;
}
