import { existsSync, mkdirSync } from "fs";
import path from "path";
import "reflect-metadata";
import { corsOptions, __prod__ } from "./constants";
import { Conversation } from "./entities/Conversation";
import { Message } from "./entities/Message";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { FitnessAppServer } from "./FitnessAppServer";
import { ConversationResolver } from "./resolvers/conversation";
import { HelloResolver } from "./resolvers/hello";
import { MessageResolver } from "./resolvers/message";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  const fileDirectories = ["./images", "./images/profilepic"];
  fileDirectories.forEach((directory) => {
    existsSync(path.join(__dirname, directory)) ||
      mkdirSync(path.join(__dirname, directory));
  });

  const myServer = new FitnessAppServer(
    "localhost",
    corsOptions,
    [
      HelloResolver,
      UserResolver,
      PostResolver,
      MessageResolver,
      ConversationResolver,
    ],
    [User, Post, Message, Conversation]
  );
  await myServer.setup();
  myServer.start();
  myServer.tester();
  // myServer.sendTestNotification("This is a test notification");
};

main().catch(console.error);
