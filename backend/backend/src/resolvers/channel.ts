import { Resolver, Mutation, Arg, Int } from "type-graphql";
import { Team } from "../entity/Team";
import { Channel } from "src/entity/Channel";

@Resolver()
class ChannelResolver {
  @Mutation(() => Team)
  async createChannel(
    @Arg("name") name: string,
    @Arg("teamId", () => Int) teamId: number,
    @Arg("public") isPublic: boolean
  ) {
    return Channel.create({
      name,
      public: isPublic,
      team: await Team.findOne({
        where: {
          id: teamId
        }
      })
    }).save();
  }

  owner() {
    return;
  }
}

export { ChannelResolver };
