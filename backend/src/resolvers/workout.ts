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
  import { Workout } from "../entities/Workout";
  import { isAuth } from "../middleware/isAuth";
  import { MyContext } from "../types";
  
  @InputType()
  class WorkoutOptions {
    @Field()
    name: string;
    @Field()
    pub: boolean;
  }
  
  @Resolver(Workout)
  export class WorkoutResolver {
    @FieldResolver(() => User)
    async creator(
      @Root() workout: Workout
    ) {
      return User.findOne(workout.creatorId);
    }
  
    @Query(() => [Workout])
    async workouts(): Promise<Workout[]> {
      return Workout.find({});
    }
  
    @Query(() => Workout, { nullable: true })
    workout(@Arg("id", () => Int) id: number): Promise<Workout | undefined> {
      return Workout.findOne(id);
    }
  
    @Mutation(() => Workout)
    @UseMiddleware(isAuth)
    async createWorkout(
      @Arg("options") options: WorkoutOptions,
      @Ctx() { req }: MyContext
    ): Promise<Workout> {
      return Workout.create({ ...options, creatorId: req.session.userId }).save();
    }
  
    @Mutation(() => Workout)
    @UseMiddleware(isAuth)
    async updateWorkout(
      @Arg("id", () => Int) id: number,
      @Arg("name") name: string,
      @Arg("pub") pub: boolean,
      @Ctx() { req }: MyContext
    ): Promise<Workout | null> {
      const result = await getConnection()
        .createQueryBuilder()
        .update(Workout)
        .set({ name, pub })
        .where({ id, creatorId: req.session.userId })
        .returning("*")
        .execute();
      return result.raw[0] as Workout;
    }
  
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteWorkout(
      @Arg("id", () => Int) id: number,
      @Ctx() { req }: MyContext
    ): Promise<boolean> {
      await Workout.delete({ id, creatorId: req.session.userId });
      return true;
    }
  }
  