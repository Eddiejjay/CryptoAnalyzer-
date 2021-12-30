import axios from 'axios'

export const getData = async (from, to) => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${from}&to=${to}`)
  return response.data



}
