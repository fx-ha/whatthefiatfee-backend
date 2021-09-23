import puppeteer from 'puppeteer'
import { FeeTable } from '../types'

const getFeeTable = async (): Promise<FeeTable[]> => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  })

  const page = await browser.newPage()

  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4298.0 Safari/537.36'
  )

  await page.goto('https://whatthefee.io')

  console.log(
    await page.$$eval('.App-footer > a:nth-child(1)', (options) =>
      options.map((option) => option.textContent)
    )
  )

  const scrapeResult = await page.evaluate(() => {
    const result = []

    for (let tableRow = 1; tableRow < 12; tableRow++) {
      for (let tableData = 2; tableData < 7; tableData++) {
        const sel = `#root > div > div:nth-child(3) > table > tbody > tr:nth-child(${tableRow}) > td:nth-child(${tableData})`

        const fee = document.body.querySelector(sel)?.textContent

        result.push(fee)
      }
    }

    return JSON.stringify(result)
  })

  console.log(scrapeResult)

  await browser.close()

  const fees: [] = JSON.parse(scrapeResult)
  console.log(fees)
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

    return { id: i, amount: Number(fee), probability, time }
  })
}

export default getFeeTable
