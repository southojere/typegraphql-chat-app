import { Resolver, Mutation, Arg } from "type-graphql";
import { Team } from "../entity/Team";
import { User } from "../entity/User";

@Resolver()
class TeamResolver {
  @Mutation(() => Team)
  async createTeam(@Arg("name") name: string) {
    return Team.create({
      name: name,
      owner: await User.findOne({ // TODO: replace once context user is provided
        where: {
          id: 'fb6e5dd7-ce72-4a78-b90d-5f85e28268bf' // TODO: fix this
        }
      })
    }).save();
  }

  owner() {
    return;
  }
}

export { TeamResolver };
