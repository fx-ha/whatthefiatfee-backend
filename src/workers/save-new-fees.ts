import { schedule } from 'node-cron'
import { getConnection } from 'typeorm'
import { Fee } from '../entities'
import { getFeeTable } from '../utils'

const saveNewFees = schedule('0 0 */1 * * *', async () => {
  const feeTable = await getFeeTable()

  if (feeTable.length === 55) {
    await getConnection().createQueryBuilder().delete().from(Fee).execute()

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Fee)
      .values(feeTable)
      .execute()
  }
})

export default saveNewFees
