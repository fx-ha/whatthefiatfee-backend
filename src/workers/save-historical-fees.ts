import { getConnection } from 'typeorm'
import { Fee, HistoricalFee, Rate } from '../entities'

const saveHistoricalFees = async (): Promise<void> => {
  const { eur, gbp, usd } = await Rate.findOneOrFail()

  const { amount: maxFee } = await Fee.findOneOrFail({
    where: { probability: 0.95, time: 1800000 },
  })
  const { amount: midFee } = await Fee.findOneOrFail({
    where: { probability: 0.95, time: 14400000 },
  })
  const { amount: minFee } = await Fee.findOneOrFail({
    where: { probability: 0.95, time: 86400000 },
  })

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(HistoricalFee)
    .values({ eur, gbp, usd, maxFee, midFee, minFee })
    .execute()
}

export default saveHistoricalFees
