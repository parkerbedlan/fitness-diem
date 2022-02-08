import { Resolver } from "type-graphql";
import { WorkoutExercise } from "../entities/WorkoutExercise";

/*
import { Field, InputType } from "type-graphql";
@InputType()
class WorkoutExerciseOptions {
  @Field()
  index: number;
  @Field()
  supersetWithPrevious: boolean;
}
*/

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
