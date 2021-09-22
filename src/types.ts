export type Rates = {
  high: string
  last: string
  timestamp: string
  bid: string
  vwap: string
  volume: string
  low: string
  ask: string
  open: string
}

export type FeeTable = {
  id: number
  time: number
  probability: number
  amount: number | undefined
}
