import  bcrypt from 'bcrypt'
import { User } from "../User";
import { findUserByEmail } from "../queries/user";
import { createTokens } from '../../libs/auth'

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


const authenticate = async (email: string, password: string, SECRET: string, SECRET2: string) => {
    const user = await findUserByEmail(email);
    if (!user) throw new Error('Could not find an account with that email.');

    // check the password matches
    const valid = await bcrypt.compare(password, user.password);
  
    if (!valid) {
      throw new Error('Invalid email or password');
    }

    // If successful authentication, we generate a new token
    const refreshSecretToken = `${user.password}${SECRET2}` 
    const [newToken, newRefreshToken] = await createTokens(user, SECRET, refreshSecretToken);
 

   return {
       ...user,
       newToken,
       newRefreshToken,
   }
  
  };

export { findOrCreateUser, authenticate }