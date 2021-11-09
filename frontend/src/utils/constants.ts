import Constants from "expo-constants";
const { manifest } = Constants;

export const __prod__ = process.env.NODE_ENV === "production";

export const serverBaseUrl = __prod__
  ? "https://fitness-api.sloper.us"
  : `http://${manifest?.debuggerHost?.split(":")[0]}:4000`;
// : "http://localhost:4000";
