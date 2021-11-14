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

@Resolver(Conversation)
export class ConversationResolver {
  @FieldResolver()
  async lastMessagePreview(@Root() conversation: Conversation) {
    // return "username: last message preview here";
    const lastMessage = await getConnection()
      .getRepository(Message)
      .createQueryBuilder("message")
      .leftJoinAndSelect("message.conversation", "conversation")
      .where("conversation.id = :convoId", { convoId: conversation.id })
      .leftJoinAndSelect("message.sender", "sender")
      .select(["message.body", "sender.username"])
      .getOne();
    const body = lastMessage?.body!;
    const username = lastMessage?.sender.username;
    const realBody = body.length < 20 ? body : body?.substring(0, 20) + "...";
    return `${username}: ${realBody}`;
  }

  @FieldResolver()
  async members(@Root() conversation: Conversation) {
    return await Conversation.findOne(conversation.id, {
      select: ["id"],
      relations: ["members"],
    }).then((convo) => convo?.members);
  }

  @FieldResolver()
  async messages(@Root() conversation: Conversation) {
    return await Conversation.findOne(conversation.id, {
      select: ["id"],
      relations: ["messages"],
    }).then((convo) => convo?.messages);
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
}
