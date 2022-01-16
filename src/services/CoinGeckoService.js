import axios from 'axios'

export const getData = async (from, to, currency, setErrorMessage ) => {
  const corsProxy = process.env.REACT_APP_CORSPROXY
  const url = `${corsProxy}https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=${currency}&from=${from}&to=${to}`
  if (from > to) {
    setErrorMessage('You must set start date earlier than end date')
    deleteErrorMessage(setErrorMessage)
  }
  else if (isNaN(from) || isNaN(to)) {
    setErrorMessage('Fill dates correctly')
    deleteErrorMessage(setErrorMessage)
  }
  try {
    const response = await axios.get(url)
    return response.data
  }
  catch(error){
    handleErrors(error, setErrorMessage)
  }
}

const handleErrors = (error, setErrorMessage) => {
  if (error.response.status === 429) {
    setErrorMessage('Too many requests! Servers ratelimit exceeded. Ratelimit 120 requests/min')
    deleteErrorMessage(setErrorMessage)
  }
  else if (error.response.status === 422 || error.response.status === 404) {
    setErrorMessage(`Server url inadequate. ${error.message}`)
    deleteErrorMessage(setErrorMessage)
  }
  else if (error.response.status === 503) {
    setErrorMessage(`Server is down ${error.message}`)
    deleteErrorMessage(setErrorMessage)
  }
  else {
    setErrorMessage(`Error: ${error.message}`)
    deleteErrorMessage(setErrorMessage)
  }
}

const deleteErrorMessage = (setErrorMessage) => {
  setTimeout(() => {
    setErrorMessage(null)
  }, 6000)
}
