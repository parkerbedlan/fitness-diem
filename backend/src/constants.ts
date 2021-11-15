import "dotenv-safe/config";
import { CorsOptions } from "cors";

export const __prod__ = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "qid";
export const FORGOT_PASSWORD_PREFIX = "forgot-password:";

export const corsOptions: CorsOptions = {
  origin: (_origin, callback) => {
    // if (!__prod__ || (origin && originWhitelist.includes(origin)))
    //   callback(null, true);
    // else {
    //   callback(new Error("Origin not allowed by CORS"));
    // }
    // console.log(_origin);
    callback(null, true);
  },
  credentials: true,
};
// const originWhitelist = [
//   !__prod__ ? "https://studio.apollographql.com" : process.env.CORS_ORIGIN,
//   process.env.CORS_ORIGIN,
// ];
