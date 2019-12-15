import { Resolver, Mutation, Arg, Query, InputType, Field } from "type-graphql";
import bcrypt from 'bcrypt'
import { User } from "../entity/User";

@InputType()
class UserInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@Resolver()
class UserResolver {
  // MUTATIONS
  @Mutation(() => User)
   async createUser(@Arg("options", () => UserInput) options: UserInput) {


    const hashPassword = await bcrypt.hash(options.password,10)
    return User.create({
      user_name: options.username,
      email: options.email,
      password: hashPassword,
    }).save()
  }

  // QUERYS
  @Query(() => [User])
  users() {
    return User.find();
  }
}

export { UserResolver };
