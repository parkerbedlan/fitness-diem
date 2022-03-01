import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Machine } from "./Machine";

@ObjectType()
@Entity()
export class Gym extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  creatorId!: number;

  @ManyToMany(() => Machine, (machine) => machine.gyms)
  machines: Machine[];
}
