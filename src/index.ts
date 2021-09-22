import 'reflect-metadata'
import 'dotenv-safe/config'
import express from 'express'
import path from 'path'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { schedule } from 'node-cron'
import { Fee, HistoricalFee, Rate } from './entities'
import { saveHistoricalFees, saveNewFees, saveNewRates } from './workers'
import { FeeResolver, HistoricalFeeResolver, RateResolver } from './resolvers'

const main = async (): Promise<void> => {
  // db
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: process.env.DB_LOGGING === 'true' ? true : false,
    synchronize: process.env.DB_SYNC === 'true' ? true : false,
    entities: [Fee, Rate, HistoricalFee],
    migrations: [path.join(__dirname, './migrations/*')],
    extra: {
      ssl: { rejectUnauthorized: false },
    },
  })

  // cron
  schedule('2 0 * * *', () => saveHistoricalFees())
  schedule('0 * * * *', () => {
    saveNewRates()
    saveNewFees()
  })

  // express
  const app = express()

  app.get('/', (_, res) => {
    res.send('Hello World!')
  })

  // apollo
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [FeeResolver, HistoricalFeeResolver, RateResolver],
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
  })

  // listen on port
  app.listen(parseInt(process.env.PORT), () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((error) => {
  console.error(error)
})
