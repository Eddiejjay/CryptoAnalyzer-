import axios from 'axios'
export const getData = async (from, to, currency ) => {
  if (from > to)
    return window.alert('You must set start date earlier than end date')
  const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=${currency}&from=${from}&to=${to}`
  try {
    const response = await axios.get(url)
    return response.data
  }
  catch(error){
    const errorString = error.toString()
    if (errorString.includes('422'))
      window.alert('Are you sure you typed url right?')
    if (errorString.includes('Network Error'))
      window.alert('Servers ratelimit exceeded')
    else
      window.alert(error)
  }}