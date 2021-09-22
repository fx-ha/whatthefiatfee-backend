import { getConnection } from 'typeorm'
import { Fee } from '../entities'
import { getFeeTable } from '../utils'

const saveNewFees = async (): Promise<void> => {
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
}

saveNewFees()

export default saveNewFees
