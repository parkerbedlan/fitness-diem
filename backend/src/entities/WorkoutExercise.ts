import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Workout } from "./Workout";
import { Exercise } from "./Exercise";

@ObjectType()
@Entity()
@Index((workoutExercise: WorkoutExercise) => [workoutExercise.workout, workoutExercise.exercise], { unique: true })
export class WorkoutExercise extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Workout)
  @ManyToOne(() => Workout, (workout) => workout.workoutExercises)
  workout: Workout;
  
  @Field(() => Exercise)
  @ManyToOne(() => Exercise, (exercise) => exercise.workoutExercises)
  exercise: Exercise;

  @Field()
  @Column()
  index!: number;

  @Field()
  @Column('boolean', {default : false})
  supersetWithPrevious: boolean = false;
}
