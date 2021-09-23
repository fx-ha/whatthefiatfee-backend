import { Query, Resolver } from 'type-graphql'
import { FeeHistory } from '../entities'

Resolver()
class FeeHistoryResolver {
  @Query(() => [FeeHistory])
  async getHistoricalFees(): Promise<FeeHistory[]> {
    return FeeHistory.find()
  }
}

export default FeeHistoryResolver
