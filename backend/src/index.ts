import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import { MessageResolver } from "./resolvers/message";
import { TeamResolver } from "./resolvers/team";
import { ChannelResolver } from "./resolvers/channel";
import { NoteResolver } from "./resolvers/note";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import { findUserById } from "./entity/queries/user";

(async () => {
  //TODO: add to env file
  const SECRET = "dsdfksjjeorj3ij43iohnsa";
  const SECRET2 = "thisisanothersecrettokening112sldaj@@#(*@#@(JHSAD";
  dotenv.config();
  const app = express();
  app.use(
    cors({
      origin: "*"
    })
  );

  const addUser = async (req: any, res: any, next: any) => {
    const token = req.headers["x-authorization"];
    if (token) {
      try {
        const { user }: any = jwt.verify(token, SECRET);
        const userModel = await findUserById(user.id);
        req.user = userModel;
      } catch (err) {
        // try refresh tokens - TODO: see how to do afterware with apollo boost
        // const refreshToken = req.headers['x-refresh-token'];
        // const newTokens = await refreshTokens(refreshToken, SECRET, SECRET2);
        // if (newTokens.token && newTokens.refreshToken) {
        //   res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        //   res.set('x-token', newTokens.token);
        //   res.set('x-refresh-token', newTokens.refreshToken);
        // }
        // req.user = newTokens.user;
      }
    }
    next();
  };
  app.use(addUser);

  console.log(process.env.TYPEORM_DATABASE);
  await createConnection({
    type: "postgres",
    host: "ec2-107-20-155-148.compute-1.amazonaws.com",
    port: 5432,
    username: "rmztuldfzbzczy",
    password:
      "a681505eeabdcff289eaea5b1ef854a2deb5830ba39f6a09c74dda022f4dab12",
    database: "dfv0gcuri0dlli",
    extra: {
      ssl: true
    },
    synchronize: true,
    logging: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    }
  }).catch(e => console.log(`[creating connection error] `, e));

  const apolloServer = new ApolloServer({
    playground: true,
    schema: await buildSchema({
      resolvers: [TeamResolver, UserResolver, MessageResolver, ChannelResolver,NoteResolver],
      validate: true
    }),
    context: ({ req }: any) => {
      const token = req.headers["x-authorization"];
      console.log(token);
      const context = {
        req,
        user: req.user,
        SECRETS: {
          one: SECRET,
          two: SECRET2
        }
        // user: req.user, // `req.user` comes from `express-jwt`
      };
      return context;
    }
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4009;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
