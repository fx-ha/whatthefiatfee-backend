import { getRates } from '../utils/'

test('resolves to Rates object', async () => {
  await expect(getRates('usd')).resolves.toEqual(
    expect.objectContaining({
      high: expect.any(String),
      last: expect.any(String),
      timestamp: expect.any(String),
      bid: expect.any(String),
      vwap: expect.any(String),
      volume: expect.any(String),
      low: expect.any(String),
      ask: expect.any(String),
      open: expect.any(String),
    })
  )
})
