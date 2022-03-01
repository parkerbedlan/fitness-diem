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
  import { WeightChart } from "../entities/WeightChart";
  import { isAuth } from "../middleware/isAuth";
  import { MyContext } from "../types";
  
  @InputType()
  class WeightChartOptions {
    @Field()
    label: string;
    weight: number;
  }
  
  @Resolver(WeightChart)
  export class WeightChartResolver {
    @FieldResolver(() => User)
    async creator(
      @Root() weightChart: WeightChart
    ) {
      return User.findOne(weightChart.creatorId);
    }

    @Query(() => [WeightChart])
    async weightCharts(): Promise<WeightChart[]> {
      return WeightChart.find({});
    }
  
    @Query(() => WeightChart, { nullable: true })
    weightChart(@Arg("id", () => Int) id: number): Promise<WeightChart | undefined> {
      return WeightChart.findOne(id);
    }
  
    @Mutation(() => WeightChart)
    @UseMiddleware(isAuth)
    async createWeightChart(
      @Arg("options") options: WeightChartOptions,
      @Ctx() { req }: MyContext
    ): Promise<WeightChart> {
      return WeightChart.create({ ...options, creatorId: req.session.userId }).save();
    }
  
    @Mutation(() => WeightChart)
    @UseMiddleware(isAuth)
    async updateWeightChart(
      @Arg("id", () => Int) id: number,
      @Arg("label") label: string,
      @Arg("weight") weight: number,
      @Ctx() { req }: MyContext
    ): Promise<WeightChart | null> {
      const result = await getConnection()
        .createQueryBuilder()
        .update(WeightChart)
        .set({ label, weight })
        .where({ id, creatorId: req.session.userId })
        .returning("*")
        .execute();
      return result.raw[0] as WeightChart;
    }
  
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteWeightChart(
      @Arg("id", () => Int) id: number,
      @Ctx() { req }: MyContext
    ): Promise<boolean> {
      await WeightChart.delete({ id, creatorId: req.session.userId });
      return true;
    }
  }
