import "dotenv-safe/config";
import { CorsOptions } from "cors";

export const __prod__ = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "qid";
export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!__prod__ || (origin && originWhitelist.includes(origin)))
      callback(null, true);
    else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
  credentials: true,
};
const originWhitelist = [
  !__prod__ ? "https://studio.apollographql.com" : process.env.CORS_ORIGIN,
  process.env.CORS_ORIGIN,
];
