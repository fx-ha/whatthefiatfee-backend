import axios from 'axios'
import { getConnection } from 'typeorm'
import { Fee } from '../entities'
import { getFeeTable } from '../utils'

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

    const { status } = await axios.get('https://whatthefiatfee.vercel.app/')

    if (status === 200) {
      console.log('trigger Incremental Static Regeneration on frontend')
    }
  }
}

export default saveNewFees
