import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./Message";
import { User } from "./User";

@ObjectType()
@Entity()
export class Conversation extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title?: string;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.conversations)
  @JoinTable()
  members: User[];

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
