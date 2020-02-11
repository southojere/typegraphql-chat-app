import { Resolver, Mutation, Arg, Query, Ctx } from "type-graphql";
import { Team } from "../entity/Team";
import { User } from "../entity/User";
// import { findUserById } from "../entity/queries/user";

const options = { relations: ["owner", "channels"] };

@Resolver(() => Team)
class TeamResolver {
  @Mutation(() => Team)
  //   @Authorized()
  async createTeam(@Arg("name") name: string, @Ctx("user") user: User) {
      console.log('createTeam')
      console.log(user)
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
  async teams(@Ctx("user") user: User) {
      if(!user) throw new Error('No user found')
    return Team.find({
      ...options,
      where: {
        owner: user ? user.id : undefined 
      }
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
