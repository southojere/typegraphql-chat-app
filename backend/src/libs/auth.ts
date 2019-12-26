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

// export const refreshTokens = async (token, refreshToken, models, SECRET) => {
//   let userId = -1;
//   try {
//     const { user: { id } } = jwt.decode(refreshToken);
//     userId = id;
//   } catch (err) {
//     return {};
//   }

//   if (!userId) {
//     return {};
//   }

//   const user = await models.User.findOne({ where: { id: userId }, raw: true });

//   if (!user) {
//     return {};
//   }

//   try {
//     jwt.verify(refreshToken, user.refreshSecret);
//   } catch (err) {
//     return {};
//   }

//   const [newToken, newRefreshToken] = await createTokens(user, SECRET, user.refreshSecret);
//   return {
//     token: newToken,
//     refreshToken: newRefreshToken,
//     user,
//   };
// };
