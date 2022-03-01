import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { MuscleGroup } from "./MuscleGroup";
import { WorkoutExercise } from "./WorkoutExercise";

@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.exercises)
  creator: User;

  @Field(() => WorkoutExercise)
  @OneToMany(() => WorkoutExercise, (workoutExercises) => workoutExercises.exercise)
  workoutExercises: WorkoutExercise[];

  @ManyToMany(() => MuscleGroup, (muscleGroup) => muscleGroup.exercises)
  muscleGroups: MuscleGroup[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
