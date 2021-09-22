import { Query, Resolver } from 'type-graphql'
import { Fee } from '../entities'

Resolver()
class FeeResolver {
  @Query(() => [Fee])
  async getFees(): Promise<Fee[]> {
    return Fee.find()
  }
}

export default FeeResolver
