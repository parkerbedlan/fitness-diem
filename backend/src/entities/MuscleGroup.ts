import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exercise } from "./Exercise";

@ObjectType()
@Entity()
export class MuscleGroup extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => [Exercise])
  @ManyToMany(() => Exercise, (exercise) => exercise.muscleGroups)
  @JoinTable()
  exercises: Exercise[];
}
