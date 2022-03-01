import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Conversation } from "./Conversation";
import { Post } from "./Post";
import { Workout } from "./Workout";
import { Exercise } from "./Exercise";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  pushToken?: string;

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @ManyToMany(() => Conversation, (conversation) => conversation.members)
  conversations: Conversation[];

  @Field(() => Workout)
  @OneToMany(() => Workout, (workouts) => workouts.creator)
  workouts: Workout[];

  @Field(() => Exercise)
  @OneToMany(() => Exercise, (exercises) => exercises.creator)
  exercises: Exercise[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  // https://github.com/typeorm/typeorm/issues/1511
  @ManyToMany(() => User, (user) => user.following)
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
  following: User[];
}
