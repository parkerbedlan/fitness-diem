import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Workout } from "./Workout";
import { Exercise } from "./Exercise";

@ObjectType()
@Entity()
export class WorkoutExercise extends BaseEntity {
  @ManyToOne(() => Workout, (workout) => workout.workoutExercises)
  workouts: Workout;
  
  @ManyToOne(() => Exercise, (exercise) => exercise.workoutExercises)
  exercises: Exercise;

  @Field()
  @Column()
  index!: number;

  @Field()
  @Column('boolean', {default : false})
  supersetWithPrevious: boolean = false;
}
