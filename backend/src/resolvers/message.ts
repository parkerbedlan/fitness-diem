import { ExpoPushMessage } from "expo-server-sdk";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
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
    const messageWithSender = await Message.findOne({
      where: { id: message.id },
      relations: ["sender"],
      select: ["id", "sender"],
    });
    return messageWithSender?.sender;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async approveNotifications(
    @Arg("pushToken") pushToken: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    req.session.pushToken = pushToken;
    // console.log(`setting user ${req.session.userId}'s pushToken to ${pushToken}`);
    User.update(req.session.userId!, { pushToken });
    return true;
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
    @Arg("conversationId") conversationId: number,
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
      .where("convo.id = :convoId", { convoId: conversationId })
      .leftJoinAndSelect("convo.members", "members")
      .where("members.id != :senderId", { senderId: req.session.userId })
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

    pushToMany(expo, pushTokens, notif);

    return true;
  }

  @Mutation(() => Number)
  @UseMiddleware(isAuth)
  async startConversation(
    @Arg("memberIds", () => [Number]) memberIds: number[],
    @Ctx() { req }: MyContext
  ) {
    const realMemberIds = [...memberIds, req.session.userId];
    const newConversation = await Conversation.create({
      members: realMemberIds.map((id) => ({ id })),
    }).save();
    return newConversation.id;

    // TODO: send notif telling members they got added to a group if 3+ members?
  }

  @Query(() => Conversation)
  @UseMiddleware(isAuth)
  async getConversation(
    @Arg("conversationId") conversationId: number
    // @Ctx() { req, expo }: MyContext
  ) {
    // TODO: verify the user is in the conversation
    return await Conversation.findOne({
      where: { id: conversationId },
      relations: ["messages", "members"],
    });
  }

  @Query(() => [Conversation])
  @UseMiddleware(isAuth)
  async getConversationPreviews(@Ctx() { req }: MyContext) {
    const user = await User.findOne({
      select: ["id"],
      where: { id: req.session.userId },
      relations: ["conversations"],
    });
    console.log(user);
    return user?.conversations;
  }
}
