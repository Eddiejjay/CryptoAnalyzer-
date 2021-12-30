import axios from 'axios'

export const getData = async (from, to, currency ) => {
  const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=${currency}&from=${from}&to=${to}`
  const response = await axios.get(url)
  return response.data



}
