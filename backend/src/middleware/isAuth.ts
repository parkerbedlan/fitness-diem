import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

// middleware runs before the resolver if they use @UseMiddleware(isAuth)
export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("not authenticated");
  }

  return next();
};
