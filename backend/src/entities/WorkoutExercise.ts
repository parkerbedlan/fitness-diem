import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
} from "typeorm";
import { Workout } from "./Workout";
import { Exercise } from "./Exercise";

@ObjectType()
@Entity()
export class WorkoutExercise extends BaseEntity {
  @Field(() => Workout)
  @ManyToOne(() => Workout, (workout) => workout.workoutExercises)
  workouts: Workout;
  
  @Field(() => Exercise)
  @ManyToOne(() => Exercise, (exercise) => exercise.workoutExercises)
  exercises: Exercise;

  @Field()
  @Column()
  index!: number;

  @Field()
  @Column('boolean', {default : false})
  supersetWithPrevious: boolean = false;
}
