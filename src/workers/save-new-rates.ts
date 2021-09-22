import { getConnection } from 'typeorm'
import { Rate } from '../entities'
import { getRates } from '../utils'

const saveNewRates = async (): Promise<void> => {
  const oldRate = await Rate.findOne()

  const [usdRate, eurRate, gbpRate] = await Promise.all([
    getRates('usd'),
    getRates('eur'),
    getRates('gbp'),
  ])

  const usd = Number(usdRate?.last ?? oldRate?.usd)
  const eur = Number(eurRate?.last ?? oldRate?.eur)
  const gbp = Number(gbpRate?.last ?? oldRate?.gbp)

  await getConnection().createQueryBuilder().delete().from(Rate).execute()

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Rate)
    .values({ eur, gbp, usd })
    .execute()
}

saveNewRates()

export default saveNewRates
