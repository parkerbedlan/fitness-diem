import "reflect-metadata";
import { corsOptions } from "./constants";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { FitnessAppServer } from "./FitnessAppServer";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  const myServer = new FitnessAppServer(
    corsOptions,
    [HelloResolver, UserResolver, PostResolver],
    [User, Post]
  );
  await myServer.setup();
  myServer.start();
};

main().catch(console.error);
