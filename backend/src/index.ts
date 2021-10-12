import "reflect-metadata";
import { corsOptions } from "./constants";
import { FitnessAppServer } from "./FitnessAppServer";
import { HelloResolver } from "./resolvers/hello";

const main = async () => {
  const myServer = new FitnessAppServer(
    corsOptions,
    [HelloResolver],
    undefined
  );
  await myServer.setup();
  myServer.start();
};

main().catch(console.error);
