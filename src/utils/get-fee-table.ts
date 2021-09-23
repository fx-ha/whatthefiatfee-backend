import axios from 'axios'
import { FeeTable } from '../types'

const getFeeTable = async (): Promise<FeeTable[] | undefined> => {
  const query = Number((Number(new Date()) / 1000 / 300).toFixed()) * 300
  const url = `https://whatthefee.io/data.json?c=${query}`
  const headers = { 'User-agent': 'WhatTheFiatFee v0.2' }
  const { status, data } = await axios.get(url, { headers })

  if (status !== 200) {
    return undefined
  }

  const fees: [] = data.data.flat()
  const probabilities = [0.05, 0.2, 0.5, 0.8, 0.95]
  const hour = 1000 * 60 * 60 * 1
  const multipliers = [0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24]
  let time: number
  let probability: number
  let row = -1
  let column = 0

  return fees.map((fee, i) => {
    if (i % 5 === 0) {
      row += 1
      column = 0
    }

    probability = probabilities[column]
    time = hour * multipliers[row]
    column += 1

    return { id: i, amount: Math.exp(Number(fee) / 100), probability, time }
  })
}

export default getFeeTable
