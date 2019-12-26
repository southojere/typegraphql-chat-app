import { User } from "../User";

const findUserById = (
  id: string | number,
  options: any = {}
): Promise<User | undefined> => {
  return User.findOne({
    where: {
      id
    },
    ...options
  });
};

const findUserByEmail = (
  email: String,
  options: any = {}
): Promise<User | undefined> => {
  return User.findOne({
    where: {
      email
    },
    ...options
  });
};

export { findUserById, findUserByEmail };
