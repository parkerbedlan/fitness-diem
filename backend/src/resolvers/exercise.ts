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
  import { User } from "../entities/User";
  import { Exercise } from "../entities/Exercise";
  import { isAuth } from "../middleware/isAuth";
  import { MyContext } from "../types";
  
  @InputType()
  class ExerciseOptions {
    @Field()
    name: string;
  }
  
  @Resolver(Exercise)
  export class ExerciseResolver {
    @FieldResolver(() => User)
    async creator(
      @Root() exercise: Exercise
    ) {
      return User.findOne(exercise.creatorId);
    }
  
    @Query(() => [Exercise])
    async exercises(): Promise<Exercise[]> {
      return Exercise.find({});
    }
  
    @Query(() => Exercise, { nullable: true })
    workout(@Arg("id", () => Int) id: number): Promise<Exercise | undefined> {
      return Exercise.findOne(id);
    }
  
    @Mutation(() => Exercise)
    @UseMiddleware(isAuth)
    async createExercise(
      @Arg("options") options: ExerciseOptions,
      @Ctx() { req }: MyContext
    ): Promise<Exercise> {
      return Exercise.create({ ...options, creatorId: req.session.userId }).save();
    }
  
    @Mutation(() => Exercise)
    @UseMiddleware(isAuth)
    async updateExercise(
      @Arg("id", () => Int) id: number,
      @Arg("name") name: string,
      @Ctx() { req }: MyContext
    ): Promise<Exercise | null> {
      const result = await getConnection()
        .createQueryBuilder()
        .update(Exercise)
        .set({ name })
        .where({ id, creatorId: req.session.userId })
        .returning("*")
        .execute();
      return result.raw[0] as Exercise;
    }
  
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteExercise(
      @Arg("id", () => Int) id: number,
      @Ctx() { req }: MyContext
    ): Promise<boolean> {
      await Exercise.delete({ id, creatorId: req.session.userId });
      return true;
    }
  }
  