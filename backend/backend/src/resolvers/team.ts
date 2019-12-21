import { Resolver, Mutation, Arg, Query, Ctx } from "type-graphql";
import { Team } from "../entity/Team";
import { User } from "../entity/User";

const options = { relations: ["owner"] };

@Resolver(() => Team)
class TeamResolver {


  @Mutation(() => Team)
//   @Authorized()
  async createTeam(@Arg("name") name: string, @Ctx("user") user: User) {
    return Team.create({
      name: name,
      owner: await User.findOne({
        where: {
          id: user.id
        }
      })
    }).save();
  }

  @Query(() => [Team])
  teams() {
    return Team.find({
      ...options
    });
  }

  @Query(() => Team)
  team(@Arg("teamId") teamId: number) {
    return Team.findOne({
      where: {
        id: teamId
      },
      ...options
    });
  }
}

export { TeamResolver };
