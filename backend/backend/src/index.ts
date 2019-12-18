import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import { MessageResolver } from "./resolvers/message";
import { TeamResolver } from "./resolvers/team";
import { ChannelResolver } from "./resolvers/channel";
import dotenv from "dotenv";
(async () => {
  dotenv.config();
  const app = express();

  await createConnection({
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    port: 5432,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
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
  }).catch(e => console.log(e));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TeamResolver, UserResolver, MessageResolver, ChannelResolver],
      validate: true,
    }),
    context: ({ req }) => {
      const context = {
        req,
        user: {
          id: 1
        }
        // user: req.user, // `req.user` comes from `express-jwt`
      };
      return context;
    },
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
