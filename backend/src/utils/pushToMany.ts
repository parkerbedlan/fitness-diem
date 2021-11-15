import Expo, { ExpoPushMessage } from "expo-server-sdk";

export const pushToMany = async (
  expo: Expo,
  pushTokens: string[],
  message: Omit<ExpoPushMessage, "to">
) => {
  let notifs = [];
  for (let pushToken of pushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    notifs.push({
      to: pushToken,
      ...message,
    });
  }

  let chunks = expo.chunkPushNotifications(notifs);
  let tickets = [];
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }
};
