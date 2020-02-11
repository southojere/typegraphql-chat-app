import {
  Resolver,
  Mutation,
  Arg,
  Query,
  InputType,
  Field,
  Ctx,
} from "type-graphql";
import bcrypt from "bcrypt";
import { User } from "../entity/User";
import { findOrCreateUser, authenticate } from "../entity/commands/user";
import { findUserByEmail, findUserById } from "../entity/queries/user";

@InputType()
class UserInput {
  @Field()
  email: string;
  @Field()
  password: string;
}


const options = { relations: ["ownedTeams", "notes"] };

@Resolver()
class UserResolver {
  // MUTATIONS
  @Mutation(() => User)
  async createUser(@Arg("options", () => UserInput) options: UserInput) {
    const hashPassword = await bcrypt.hash(options.password, 12);
    const existingUser = await findUserByEmail(options.email);
    if (existingUser) {
      throw new Error(`User already exists with this email (${options.email})`);
    }
    return findOrCreateUser({
      password: hashPassword,
      email: options.email
    });
  }

  @Mutation(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx("SECRETS") SECRETS: {
        one: string,
        two: string,
    }
  ) {
    const user: any = await authenticate(
      email,
      password,
      SECRETS.one,
      SECRETS.two
    );
    // if (!user) throw new Error("Could not authenticate the user");

    // console.log(user);
    return user;
  }

  // QUERYS
  @Query(() => [User])
  users() {
    return User.find({ ...options });
  }

  @Query(() => User)
  user(@Arg("user_id") id: number) {
    return findUserById(id, options);
  }
}

export { UserResolver };
