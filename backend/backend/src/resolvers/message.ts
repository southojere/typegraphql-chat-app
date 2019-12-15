import { Resolver, Mutation, Arg } from "type-graphql";

@Resolver()
class MessageResolver {
  @Mutation(() => Boolean)
  createMessage(@Arg("userId") id: string, @Arg("message") message: string) {
      console.log(id, message)
      return true
  }
}

export { MessageResolver };
