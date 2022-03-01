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
  import { Machine } from "../entities/Machine";
  import { isAuth } from "../middleware/isAuth";
  import { MyContext } from "../types";
  
  @InputType()
  class MachineOptions {
    @Field()
    name: string;
  }
  
  @Resolver(Machine)
  export class MachineResolver {
    @FieldResolver(() => User)
    async creator(
      @Root() machine: Machine
    ) {
      return User.findOne(machine.creatorId);
    }

    @Query(() => [Machine])
    async machines(): Promise<Machine[]> {
      return Machine.find({});
    }
  
    @Query(() => Machine, { nullable: true })
    machine(@Arg("id", () => Int) id: number): Promise<Machine | undefined> {
      return Machine.findOne(id);
    }
  
    @Mutation(() => Machine)
    @UseMiddleware(isAuth)
    async createMachine(
      @Arg("options") options: MachineOptions,
      @Ctx() { req }: MyContext
    ): Promise<Machine> {
      return Machine.create({ ...options, creatorId: req.session.userId }).save();
    }
  
    @Mutation(() => Machine)
    @UseMiddleware(isAuth)
    async updateMachine(
      @Arg("id", () => Int) id: number,
      @Arg("name") name: string,
      @Ctx() { req }: MyContext
    ): Promise<Machine | null> {
      const result = await getConnection()
        .createQueryBuilder()
        .update(Machine)
        .set({ name })
        .where({ id, creatorId: req.session.userId })
        .returning("*")
        .execute();
      return result.raw[0] as Machine;
    }
  
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteMachine(
      @Arg("id", () => Int) id: number,
      @Ctx() { req }: MyContext
    ): Promise<boolean> {
      await Machine.delete({ id, creatorId: req.session.userId });
      return true;
    }
  }
