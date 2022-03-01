import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Gym } from "./Gym";
import { WeightChart } from "./WeightChart";

@ObjectType()
@Entity()
export class Machine extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  creatorId!: number;

  @Field(() => [Gym])
  @ManyToMany(() => Gym, (gym) => gym.machines)
  @JoinTable()
  gyms: Gym[];

  @Field(() => WeightChart)
  @ManyToOne(() => WeightChart, (weightChart) => weightChart.machines)
  weightChart: WeightChart;
}
