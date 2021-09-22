import { Query, Resolver } from 'type-graphql'
import { HistoricalFee } from '../entities'

Resolver()
class HistoricalFeeResolver {
  @Query(() => [HistoricalFee])
  async getHistoricalFees(): Promise<HistoricalFee[]> {
    return HistoricalFee.find()
  }
}

export default HistoricalFeeResolver
