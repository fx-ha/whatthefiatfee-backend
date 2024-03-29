import { getConnection } from 'typeorm'
import { Fee, FeeHistory, Rate } from '../entities'
import { triggerIsr } from '../utils'

const saveFeeHistory = async (): Promise<void> => {
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
    .into(FeeHistory)
    .values({ eur, gbp, usd, maxFee, midFee, minFee })
    .execute()

  await triggerIsr('https://whatthefiatfee.vercel.app/history/')
}

export default saveFeeHistory
