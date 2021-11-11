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
  const fileDirectories = ["./images", "./images/profilepic"];
  fileDirectories.forEach((directory) => {
    existsSync(path.join(__dirname, directory)) ||
      mkdirSync(path.join(__dirname, directory));
  });

  const myServer = new FitnessAppServer(
    __prod__ ? "localhost" : "LAN",
    corsOptions,
    [HelloResolver, UserResolver, PostResolver],
    [User, Post]
  );
  await myServer.setup();
  myServer.start();
  myServer.sendTestNotification("This is a test notification");
};

main().catch(console.error);
