import {
    Arg,
    Ctx,
    Field,
    InputType,
    Int,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
  } from "type-graphql";
  import { getConnection } from "typeorm";
  import { MuscleGroup } from "../entities/MuscleGroup";
  import { isAuth } from "../middleware/isAuth";
  import { MyContext } from "../types";
  
  @InputType()
  class MuscleGroupOptions {
    @Field()
    name: string;
  }
  
  @Resolver(MuscleGroup)
  export class MuscleGroupResolver {
    @Query(() => [MuscleGroup])
    async muscleGroups(): Promise<MuscleGroup[]> {
      return MuscleGroup.find({});
    }
  
    @Query(() => MuscleGroup, { nullable: true })
    muscleGroup(@Arg("id", () => Int) id: number): Promise<MuscleGroup | undefined> {
      return MuscleGroup.findOne(id);
    }
  
    @Mutation(() => MuscleGroup)
    @UseMiddleware(isAuth)
    async createMuscleGroup(
      @Arg("options") options: MuscleGroupOptions
    ): Promise<MuscleGroup> {
      return MuscleGroup.create({ ...options }).save();
    }
  
    @Mutation(() => MuscleGroup)
    @UseMiddleware(isAuth)
    async updateMuscleGroup(
      @Arg("id", () => Int) id: number,
      @Arg("name") name: string,
      @Ctx() { req }: MyContext
    ): Promise<MuscleGroup | null> {
      const result = await getConnection()
        .createQueryBuilder()
        .update(MuscleGroup)
        .set({ name })
        .where({ id, creatorId: req.session.userId })
        .returning("*")
        .execute();
      return result.raw[0] as MuscleGroup;
    }
  
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteMuscleGroup(
      @Arg("id", () => Int) id: number
    ): Promise<boolean> {
      await MuscleGroup.delete({ id });
      return true;
    }
  }
