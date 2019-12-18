import { Resolver, Mutation, Arg } from "type-graphql";
import { Team } from "../entity/Team";

@Resolver()
class TeamResolver {
  @Mutation(() => Team)
  async createTeam(@Arg("name") name: string) {
    return Team.create({
      name: name,
    //   owner: 1, TODO
    }).save();
  }

  owner() {
    return;
  }
}

export { TeamResolver };
