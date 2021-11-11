import { ExpoPushMessage } from "expo-server-sdk";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

@Resolver()
export class MessageResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async approveNotifications(
    @Arg("pushToken") pushToken: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    console.log(
      `setting user ${req.session.userId}'s pushToken to ${pushToken}`
    );
    User.update(req.session.userId!, { pushToken });
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async sendMyselfANotification(
    @Arg("messageText") messageText: string,
    @Ctx() { req, expo }: MyContext
  ): Promise<boolean> {
    const user = await User.findOne(req.session.userId!);
    const pushToken = user?.pushToken;

    if (!pushToken) return false;

    const message: ExpoPushMessage = {
      to: pushToken,
      sound: "default",
      title: "Test notification",
      body: messageText,
      data: { withSome: "data" },
    };

    console.log(
      `sending user ${req.session.userId} with pushToken ${pushToken} the message "${messageText}"`
    );
    expo.sendPushNotificationsAsync([message]);
    return true;
  }
}
