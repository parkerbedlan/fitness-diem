import { Request, Response } from "express";
import { Session } from "express-session";
import { Redis } from "ioredis";

// https://stackoverflow.com/questions/65108033/property-user-does-not-exist-on-type-session-partialsessiondata
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html
// ? https://dev.to/chris927/extending-express-types-with-typescript-declaration-merging-typescript-4-3jh ?
declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

export type MyContext = {
  req: Request & { session: Session };
  res: Response;
  redis: Redis;
};
