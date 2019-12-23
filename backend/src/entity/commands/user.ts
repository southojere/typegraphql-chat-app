import { User } from "../User";
import { findUserByEmail } from "../queries/user";

const findOrCreateUser = async (userData: {
  email: string;
  password: string;
}): Promise<User | undefined> => {
  const user = await findUserByEmail(userData.email);
  if (user) return user;
  return User.create({
    ...userData
  }).save();
};


export { findOrCreateUser }