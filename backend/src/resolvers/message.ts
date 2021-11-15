import { ExpoPushMessage } from "expo-server-sdk";
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Conversation } from "../entities/Conversation";
import { Message } from "../entities/Message";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { pushToMany } from "../utils/pushToMany";

@Resolver(Message)
export class MessageResolver {
  @FieldResolver(() => User)
  async sender(@Root() message: Message) {
    const messageWithSender = await Message.findOne(message.id, {
      select: ["id"],
      relations: ["sender"],
    });
    return messageWithSender?.sender;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async sendMyselfANotification(
    @Arg("messageText") messageText: string,
    @Ctx() { req, expo }: MyContext
  ): Promise<boolean> {
    const user = await User.findOne(req.session.userId!, {
      select: ["pushToken"],
    });
    const pushToken = user?.pushToken;

    if (!pushToken) return false;

    const message: ExpoPushMessage = {
      to: pushToken,
      sound: "default",
      title: "Test notification",
      body: messageText,
      data: { withSome: "data" },
    };

    // console.log(`sending user ${req.session.userId} with pushToken ${pushToken} the message "${messageText}"`);
    expo.sendPushNotificationsAsync([message]);
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async sendMessage(
    @Arg("conversationId", () => Int) conversationId: number,
    @Arg("body") body: string,
    @Ctx() { req, expo }: MyContext
  ) {
    // TODO: verify the user is in the conversation

    // store message in database
    await Message.create({
      body,
      conversation: { id: conversationId },
      sender: { id: req.session.userId },
    }).save();

    // send notifications
    const pushTokens = (await getConnection()
      .getRepository(Conversation)
      .createQueryBuilder("convo")
      .leftJoinAndSelect("convo.members", "members")
      .where("convo.id = :convoId", { convoId: conversationId })
      .andWhere("members.id != :senderId", { senderId: req.session.userId })
      .select(["convo.id", "members.pushToken"])
      .getOne()
      .then((response) =>
        response?.members.map((member) => member.pushToken)
      )) as string[];

    const sender = await User.findOne(req.session.userId, {
      select: ["username"],
    });

    let messageBodyPreview =
      body.length < 20 ? body : body.substring(0, 20) + "...";

    const notif = {
      body: `${sender?.username}: ${messageBodyPreview}`,
      data: {
        conversationId: conversationId,
        senderId: req.session.userId,
        body,
      },
    };

    console.log(pushTokens, notif);

    pushToMany(expo, pushTokens, notif);

    return true;
  }
}
