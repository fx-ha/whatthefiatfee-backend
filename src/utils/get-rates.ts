import axios from 'axios'
import { Rates } from '../types'

const getRates = async (currency: string): Promise<Rates | undefined> => {
  const url = `https://www.bitstamp.net/api/v2/ticker/btc${currency}`
  const headers = { 'User-agent': 'WhatTheFiatFee v0.2' }
  const response = await axios.get(url, { headers })

  if (response.status === 200) {
    return response.data
  }

  console.log(response.statusText)

  return undefined
}

export default getRates
