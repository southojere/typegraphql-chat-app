module.exports = {
    name: "default",
    synchronize: true,
    logging: true,
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
    url: "postgres://rmztuldfzbzczy:a681505eeabdcff289eaea5b1ef854a2deb5830ba39f6a09c74dda022f4dab12@ec2-107-20-155-148.compute-1.amazonaws.com:5432/dfv0gcuri0dlli",
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    }
  }
