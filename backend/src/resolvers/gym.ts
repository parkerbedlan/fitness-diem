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
  import { Gym } from "../entities/Gym";
  import { isAuth } from "../middleware/isAuth";
  import { MyContext } from "../types";
  
  @InputType()
  class GymOptions {
    @Field()
    name: string;
  }
  
  @Resolver(Gym)
  export class GymResolver {
    @FieldResolver(() => User)
    async creator(
      @Root() gym: Gym
    ) {
      return User.findOne(gym.creatorId);
    }

    @Query(() => [Gym])
    async gyms(): Promise<Gym[]> {
      return Gym.find({});
    }
  
    @Query(() => Gym, { nullable: true })
    gym(@Arg("id", () => Int) id: number): Promise<Gym | undefined> {
      return Gym.findOne(id);
    }
  
    @Mutation(() => Gym)
    @UseMiddleware(isAuth)
    async createGym(
      @Arg("options") options: GymOptions,
      @Ctx() { req }: MyContext
    ): Promise<Gym> {
      return Gym.create({ ...options, creatorId: req.session.userId }).save();
    }
  
    @Mutation(() => Gym)
    @UseMiddleware(isAuth)
    async updateGym(
      @Arg("id", () => Int) id: number,
      @Arg("name") name: string,
      @Ctx() { req }: MyContext
    ): Promise<Gym | null> {
      const result = await getConnection()
        .createQueryBuilder()
        .update(Gym)
        .set({ name })
        .where({ id, creatorId: req.session.userId })
        .returning("*")
        .execute();
      return result.raw[0] as Gym;
    }
  
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteGym(
      @Arg("id", () => Int) id: number,
      @Ctx() { req }: MyContext
    ): Promise<boolean> {
      await Gym.delete({ id, creatorId: req.session.userId });
      return true;
    }
  }
