import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    InputType,
    Int,
    Mutation,
    Query,
    Resolver,
    Root,
    UseMiddleware,
  } from "type-graphql";
  import { getConnection } from "typeorm";
  import { WorkoutExercise } from "../entities/WorkoutExercise";
  import { isAuth } from "../middleware/isAuth";
  import { MyContext } from "../types";
  
  @InputType()
  class WorkoutExerciseOptions {
    @Field()
    index: number;
    @Field()
    supersetWithPrevious: boolean;
  }
  
  @Resolver(WorkoutExercise)
  export class WorkoutExerciseResolver {
    // todo: Add the necessary stuff here
  }
  