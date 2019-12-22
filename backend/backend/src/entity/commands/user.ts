import { User } from "../User";
import { findUserByEmail } from "../queries/user";

const findOrCreateUser = async (userData: {
  user_name: string;
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