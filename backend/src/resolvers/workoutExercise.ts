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
    // @Query(() => WorkoutExercise, { nullable: true })
    // nextExercise(@Arg("id", () => Int) id: number): Promise<Exercise | undefined> {
    //   return WorkoutExercise.findOne(id);
    // }

    // @Mutation(() => Exercise)
    // @UseMiddleware(isAuth)
    // async updateExercise(
    //   @Arg("id", () => Int) id: number,
    //   @Arg("name") name: string,
    //   @Ctx() { req }: MyContext
    // ): Promise<Exercise | null> {
    //   const result = await getConnection()
    //     .createQueryBuilder()
    //     .update(Exercise)
    //     .set({ name })
    //     .where({ id, creatorId: req.session.userId })
    //     .returning("*")
    //     .execute();
    //   return result.raw[0] as Exercise;
    // }
  }
  