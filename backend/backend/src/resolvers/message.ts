import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../entity/User";
import { Message } from "../entity/Message";
import { findUserById } from "../entity/queries/user";

@Resolver()
class MessageResolver {
  @Mutation(() => Message)
  async createMessage(
    @Ctx("user") user: User,
    @Arg("message") message: string
  ) {
    return Message.create({
      msg: message,
      user: await findUserById(parseInt(user.id, 10))
    }).save();
  }
}

export { MessageResolver };
