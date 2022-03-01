import "dotenv-safe/config";
import { User } from "../entities/User";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import argon2 from "argon2";
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from "../constants";
import { sendEmail } from "../utils/sendEmail";
import { v4 as uuid } from "uuid";
import { RegisterInput } from "./types/RegisterInput";
import { isAuth } from "../middleware/isAuth";
import { EditProfileInput } from "./types/EditProfileInput";
import { deleteNullUndefinedValues } from "../utils/deleteNullUndefinedValues";
import { validateFields } from "../utils/validation/validateFields";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import path from "path";

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session.userId === user.id) {
      return user.email;
    }
    return "";
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async approveNotifications(
    @Arg("pushToken") pushToken: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    req.session.pushToken = pushToken;
    User.update(req.session.userId!, { pushToken });
    return true;
  }

  @Mutation(() => Boolean)
  async editProfilePic(
    @Arg("fileUpload", () => GraphQLUpload)
    { createReadStream }: FileUpload,
    @Ctx() { req }: MyContext
  ) {
    try {
      await new Promise((res) =>
        createReadStream()
          .pipe(
            createWriteStream(
              path.join(
                __dirname,
                "../images/profilepic",
                `${req.session.userId}.png`
              )
            )
          )
          .on("close", res)
      );
    } catch (error) {
      console.error(error);
    }
    return true;
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  async editProfile(
    @Arg("options") options: EditProfileInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    // ignore null/undefined values (reduces payload not needing to repeat unchanged fields)
    const newValues = deleteNullUndefinedValues(options);

    const validationErrors = await validateFields(newValues);
    if (validationErrors) return { errors: validationErrors };

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .update(User)
        .set(newValues)
        .where({ id: req.session.userId })
        .returning("*")
        .execute();
      return { user: result.raw[0] as User };
    } catch (error) {
      if (error.detail.includes("already exists")) {
        if (error.detail.includes("username")) {
          return {
            errors: [
              { field: "username", message: "That username already exists" },
            ],
          };
        } else if (error.detail.includes("email")) {
          return {
            errors: [{ field: "email", message: "That email already exists" }],
          };
        }
      }
      return {
        errors: [{ field: "username", message: error.message as string }],
      };
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async follow(@Arg("userId") userId: number, @Ctx() { req }: MyContext) {
    // https://github.com/typeorm/typeorm/blob/master/docs/relational-query-builder.md
    await getConnection()
      .createQueryBuilder()
      .relation(User, "following")
      .of(req.session.userId)
      .add(userId);

    return true;
  }

  @Mutation(() => Boolean)
  async unfollow(@Arg("userId") userId: number, @Ctx() { req }: MyContext) {
    // https://github.com/typeorm/typeorm/blob/master/docs/relational-query-builder.md
    await getConnection()
      .createQueryBuilder()
      .relation(User, "following")
      .of(req.session.userId)
      .remove(userId);

    return true;
  }

  @Query(() => [User])
  async followers(@Arg("userId") userId: number) {
    return await getConnection()
      .createQueryBuilder()
      .relation(User, "followers")
      .of(userId)
      .loadMany();
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "length must be greater than 2",
          },
        ],
      };
    }

    const redisTokenKey = FORGOT_PASSWORD_PREFIX + token;
    const userId = await redis.get(redisTokenKey);
    if (!userId) {
      return { errors: [{ field: "token", message: "token expired" }] };
    }

    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);
    if (!user) {
      return { errors: [{ field: "token", message: "user no longer exists" }] };
    }

    const hashedPassword = await argon2.hash(newPassword);
    await User.update({ id: userIdNum }, { password: hashedPassword });

    await redis.del(redisTokenKey);

    // log in user after change password
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // email not in the db
      return true;
    }

    const token = uuid();

    await redis.set(
      FORGOT_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3 // 3 days
    );

    sendEmail(
      email,
      `<a href="${process.env.CORS_ORIGIN}/change-password/${token}">Reset Password</a>`
    );

    return true;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    // not logged in
    if (!req.session.userId) {
      return null;
    }
    return User.findOne(req.session.userId);
  }

  // TODO: use yup or regex for username/password validation
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const validationErrors = await validateFields(options);
    if (validationErrors) return { errors: validationErrors };

    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      user = await User.create({
        username: options.username,
        email: options.email,
        password: hashedPassword,
      }).save();

      // log in user after registering
      req.session.userId = user.id;
    } catch (err) {
      if (err.code === "23505" || err.detail.includes("already exists")) {
        return {
          errors: [{ field: "username", message: "username already taken" }],
        };
      }
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({
      where: usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail },
    });

    if (!user) {
      return {
        errors: [
          { field: "usernameOrEmail", message: "that user doesn't exist" },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res: response }: MyContext) {
    await User.update(req.session.userId!, { pushToken: undefined });

    return new Promise((resolve) =>
      req.session.destroy((err) => {
        response.clearCookie(COOKIE_NAME);
        if (err) {
          console.error(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
