import { serverBaseUrl } from "./constants";

export const getProfilePicUri = (userId: number) => {
  return `${serverBaseUrl}/profilepic/${userId}.png`;
};
