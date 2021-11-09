import { serverBaseUrl } from "./constants";

export const getProfilePicUri = (username: string) => {
  return `${serverBaseUrl}/profilepic/${username}.png`;
};
