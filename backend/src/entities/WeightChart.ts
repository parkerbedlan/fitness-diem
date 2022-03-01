import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Machine } from "./Machine";

@ObjectType()
@Entity()
export class WeightChart extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  label!: string;

  @Field()
  @Column()
  weight!: number;

  @Field()
  @Column()
  creatorId!: number;

  @Field(() => Machine)
  @OneToMany(() => Machine, (machine) => machine.weightChart)
  machines: Machine[];
}
