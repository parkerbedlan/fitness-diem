import { existsSync, mkdirSync } from "fs";
import path from "path";
import "reflect-metadata";
import { corsOptions, __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { FitnessAppServer } from "./FitnessAppServer";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  existsSync(path.join(__dirname, "./images")) ||
    mkdirSync(path.join(__dirname, "./images"));
  const myServer = new FitnessAppServer(
    __prod__ ? "localhost" : "LAN",
    corsOptions,
    [HelloResolver, UserResolver, PostResolver],
    [User, Post]
  );
  await myServer.setup();
  myServer.start();
};

main().catch(console.error);
