import { getFeeTable } from '../utils/'

test('resolves to array with fee data objects', async () => {
  await expect(getFeeTable()).resolves.toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        time: expect.any(Number),
        probability: expect.any(Number),
        amount: expect.any(Number),
      }),
    ])
  )
})
