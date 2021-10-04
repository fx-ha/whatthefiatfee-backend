import { getConnection } from 'typeorm'
import { Fee } from '../entities'
import { getFeeTable, triggerIsr } from '../utils'

const saveNewFees = async (): Promise<void> => {
  const feeTable = await getFeeTable()

  if (feeTable?.length === 55) {
    await getConnection().createQueryBuilder().delete().from(Fee).execute()

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Fee)
      .values(feeTable)
      .execute()

    await triggerIsr('https://whatthefiatfee.vercel.app/')
  }
}

export default saveNewFees
