import { serverBaseUrl } from "./constants";

export const getPostPicUri = (postId: number) => {
  return `${serverBaseUrl}/postpic/${postId}.png`;
};
