import { ApolloServer, ExpressContext } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors, { CorsOptions } from "cors";
import "dotenv-safe/config";
import { Expo, ExpoPushMessage } from "expo-server-sdk";
import express, { Express } from "express";
import session from "express-session";
import fs from "fs";
import { graphqlUploadExpress } from "graphql-upload";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema, NonEmptyArray } from "type-graphql";
import { Connection, createConnection, EntitySchema } from "typeorm";
import { COOKIE_NAME, corsOptions, __prod__ } from "./constants";
import { Conversation } from "./entities/Conversation";
import { User } from "./entities/User";
import { ConversationResolver } from "./resolvers/conversation";
import { MessageResolver } from "./resolvers/message";
import { MyContext } from "./types";
import { getLANipAddress } from "./utils/getLANipAddress";

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
  expo: Expo;

  resolvers: Resolvers;
  entities?: Entities;

  constructor(
    hostingMode: HostingMode,
    corsOptions: CorsOptions,
    resolvers: Resolvers,
    entities?: Entities
  ) {
    this.hostingMode = __prod__ ? "localhost" : hostingMode;
    this.corsOptions = corsOptions;
    this.resolvers = resolvers;
    this.entities = entities;
  }

  public async tester() {
    console.log("----------------------------------------------");

    console.log(await User.find({ select: ["id", "username", "pushToken"] }));
    // await Conversation.delete(6);
    console.log(
      await Conversation.find({
        select: ["id"],
        relations: ["members"],
        loadRelationIds: true,
      })
    );

    // const asdf = new MessageResolver();
    // asdf.sendMessage(3, "ooga booga 15", {
    //   req: {
    //     session: { userId: 1 },
    //   },
    //   expo: this.expo,
    // } as MyContext);

    // const asdf = new ConversationResolver();
    // console.log(
    //   await asdf.getConversationPreviews({
    //     req: { session: { userId: 2 } },
    //   } as MyContext)
    // );

    // const pushTokens = await getConnection()
    //   .getRepository(Conversation)
    //   .createQueryBuilder("convo")
    //   .leftJoinAndSelect("convo.members", "members")
    //   .where("convo.id = :convoId", { convoId: 3 })
    //   .andWhere("members.id != :senderId", { senderId: 1 })
    //   .select(["convo.id", "members.pushToken"])
    //   .getOne()
    //   .then((response) => response?.members.map((member) => member.pushToken));
    // console.log(pushTokens);

    // pushToMany(this.expo, ["ExponentPushToken[WXVEetGVp9awuCdPL616fy]"], {
    //   sound: "default",
    //   title: "Test notification",
    //   body: "blah blah blah",
    //   data: { withSome: "data" },
    // });

    console.log("----------------------------------------------");
  }

  // https://github.com/expo/expo-server-sdk-node
  public async sendTestNotification(messageText: string) {
    const pushToken = "ExponentPushToken[WXVEetGVp9awuCdPL616fy]";
    let messages: ExpoPushMessage[] = [];
    messages.push({
      to: pushToken,
      sound: "default",
      title: "Test notification",
      body: messageText,
      data: { withSome: "data" },
    });
    let chunks = this.expo.chunkPushNotifications(messages);
    let tickets = [];
    for (let chunk of chunks) {
      try {
        let ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  }

  public async setup() {
    this.configureApp();
    await this.configureOrm();
    this.configureSessionCookies();
    this.configureExpo();
    await this.configureApolloServer();
    this.configureFileManagement();
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
        expo: this.expo,
      }),
    });

    await this.apolloServer.start();
    this.app.use(graphqlUploadExpress());
    this.apolloServer.applyMiddleware({
      app: this.app,
      cors: false,
    });
  }

  private configureExpo() {
    this.expo = new Expo();
  }

  private configureFileManagement() {
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
  }
}
