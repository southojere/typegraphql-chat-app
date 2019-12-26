import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { User } from '../entity/User';

export const createTokens = async (user: User, secret: string, secret2: string) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, ['id']),
    },
    secret,
    {
      expiresIn: '1h',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    secret2,
    {
      expiresIn: '7d',
    },
  );

  return [createToken, createRefreshToken];
};

export const refreshTokens = async (refreshToken: string, SECRET: string, SECRET2: string) => {
  let userId = -1;
  try {
    const { user: { id } }: any = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await User.findOne({ where: { id: userId }});

  if (!user) {
    return {};
  }

  const refreshSecret = user.password + SECRET2

  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(user, SECRET, refreshSecret);
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};
