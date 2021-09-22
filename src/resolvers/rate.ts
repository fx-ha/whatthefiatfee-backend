import { Query, Resolver } from 'type-graphql'
import { Rate } from '../entities'

Resolver()
class RateResolver {
  @Query(() => Rate)
  async getRate(): Promise<Rate> {
    return Rate.findOneOrFail()
  }
}

export default RateResolver
