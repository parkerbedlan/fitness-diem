import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Conversation } from "./Conversation";
import { User } from "./User";

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  body: string;

  @Field(() => Conversation)
  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @Field()
  @ManyToOne(() => User)
  sender: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
