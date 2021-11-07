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
import { graphqlUploadExpress } from "graphql-upload";
import { getLANipAddress } from "./utils/getLANipAddress";
import fs from "fs";

type HostingMode = "localhost" | "LAN";
type Resolvers = NonEmptyArray<Function> | NonEmptyArray<string>;
type Entities = (Function | string | EntitySchema<any>)[];

export class FitnessAppServer {
  hostingMode: HostingMode;
  corsOptions: CorsOptions;
  app: Express;
  ormConnection: Connection;
  redis: Redis.Redis;
  RedisStore: connectRedis.RedisStore;
  apolloServer: ApolloServer<ExpressContext>;

  resolvers: Resolvers;
  entities?: Entities;

  constructor(
    hostingMode: HostingMode,
    corsOptions: CorsOptions,
    resolvers: Resolvers,
    entities?: Entities
  ) {
    this.hostingMode = hostingMode;
    this.corsOptions = corsOptions;
    this.resolvers = resolvers;
    this.entities = entities;
  }

  public async setup() {
    this.configureApp();
    await this.configureOrm();
    this.configureSessionCookies();
    await this.configureApolloServer();

    this.app.get("/testimage.png", (_req, res) => {
      res.send(fs.readFileSync(path.join(__dirname, "images/testfile.png")));
    });
    this.app.get("/profilepic/:username.png", (req, res) => {
      const filePath = path.join(
        __dirname,
        `images/profilepic/${req.params.username}.png`
      );
      const fileExists = fs.existsSync(filePath);
      if (fileExists) {
        res.send(fs.readFileSync(filePath));
      } else {
        res.send("ERROR: no profile pic for that user");
      }
    });
    // this.app.use("/images", express.static(path.join(__dirname, "../images")));
  }

  public start() {
    const ipAddress =
      this.hostingMode === "localhost" ? "localhost" : getLANipAddress();

    this.app.listen(parseInt(process.env.PORT!), ipAddress as string, () => {
      console.log(
        `server started on ${ipAddress}:${parseInt(process.env.PORT!)}`
      );
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
    this.app.use(graphqlUploadExpress());
    this.apolloServer.applyMiddleware({
      app: this.app,
      cors: false,
    });
  }
}
