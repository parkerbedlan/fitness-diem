import "reflect-metadata";
import "dotenv-safe/config";
import { COOKIE_NAME, __prod__ } from "./constants";
import express, { Express } from "express";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { buildSchema, NonEmptyArray } from "type-graphql";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "./types";
import cors, { CorsOptions } from "cors";
import Redis from "ioredis";
import { corsOptions } from "./constants";
import { Connection, createConnection, EntitySchema } from "typeorm";
import path from "path";

type Resolvers = NonEmptyArray<Function> | NonEmptyArray<string>;
type Entities = (Function | string | EntitySchema<any>)[];

export class FitnessAppServer {
  corsOptions: CorsOptions;
  app: Express;
  ormConnection: Connection;
  redis: Redis.Redis;
  RedisStore: connectRedis.RedisStore;
  apolloServer: ApolloServer<ExpressContext>;

  resolvers: Resolvers;
  entities?: Entities;

  constructor(
    corsOptions: CorsOptions,
    resolvers: Resolvers,
    entities?: Entities
  ) {
    this.corsOptions = corsOptions;
    this.resolvers = resolvers;
    this.entities = entities;
  }

  public async setup() {
    this.configureApp();
    await this.configureOrm();
    this.configureSessionCookies();
    await this.configureApolloServer();
  }

  public start() {
    this.app.listen(parseInt(process.env.PORT!), () => {
      console.log(`server started on localhost:${parseInt(process.env.PORT!)}`);
    });
  }

  private configureApp() {
    this.app = express();
    this.app.use(cors(corsOptions));
  }

  private async configureOrm() {
    this.ormConnection = await createConnection({
      type: "postgres",
      url: process.env.DATABASE_URL,
      logging: true,
      migrations: [path.join(__dirname, "./migrations/*")],
      entities: this.entities,
      synchronize: !__prod__,
    });
    if (__prod__) await this.ormConnection.runMigrations();
    // await Post.delete({});
  }

  private configureSessionCookies = () => {
    this.RedisStore = connectRedis(session);
    this.redis = new Redis(process.env.REDIS_URL);
    // TODO: make the proxy set only run if __prod__?
    this.app.set("proxy", 1);
    this.redis.on("error", (err) => {
      console.log("Could not establish a connection with redis. " + err);
    });
    this.redis.on("connect", (err) => {
      console.log("Connected to redis successfully" + (err || ""));
    });

    this.app.use(
      session({
        name: COOKIE_NAME,
        store: new this.RedisStore({ client: this.redis, disableTouch: true }),
        cookie: {
          httpOnly: true,
          sameSite: "none",
          maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // session max age in miliseconds
          secure: __prod__,
          domain: __prod__ ? ".sloper.us" : undefined,
        },
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
      })
    );
  };

  private async configureApolloServer() {
    this.apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: this.resolvers,
        validate: false,
      }),
      context: ({ req, res }): MyContext => ({
        req,
        res,
        redis: this.redis,
      }),
    });

    await this.apolloServer.start();
    this.apolloServer.applyMiddleware({
      app: this.app,
      cors: false,
    });
  }
}
