require("dotenv").config()
import express from "express"
import { createServer } from "http"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core"
import "reflect-metadata"

import { createConnection } from "typeorm"
import { User } from "./entities/User"
import { GreetingResolver } from "./resolvers/greeting"

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "jwt-authentication",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [User],
  })

  const app = express()
  const httpServer = createServer(app)
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [GreetingResolver],
    }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground,
    ],
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  const PORT = process.env.PORT || 4000

  await new Promise((resolve) =>
    httpServer.listen({ port: PORT }, resolve as () => void)
  )

  console.log(
    `SERVER STARTED ON PORT ${PORT}. GRAPQL ENDPOINT ON http://localhost:${PORT}${apolloServer.graphqlPath}`
  )
}

main().catch((error) => console.log("ERROR STARTING SERVER", error))
