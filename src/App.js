import React, { useState } from 'react'
import { unixToDate, dateToUnix, rangeLengthInDays, highestValue,
  bestDaysToBuyAndSell, bearishRunCalculator, parseHourlyValuesToDailyValues, addHourToUnix } from './utils/tools'
import { StyledInput, StyledButton, Text, HeadingText,
  Container, Heading, MainContainer, DataContainer, ErrorMessage } from './components/StyledComponents'
import { getData } from './services/CoinGeckoService'

const App = () => {
  const [bearishTrend, setBearishTrend] = useState(null)
  const [tradingVolume, setTradingVolume] = useState(null)
  const [bestDays, setBestDays] = useState(null)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const getCoinData = async (fromDate, toDate) => {
    const from = dateToUnix(fromDate)
    const to = addHourToUnix(dateToUnix(toDate))
    const rangeLength = rangeLengthInDays(from,to)
    const data  = await getData(from,to, 'EUR', setErrorMessage)
    dataParser(rangeLength, data)
  }

  const dataParser = (rangeLength, data) => {
    if (rangeLength >= 1 && rangeLength <= 90){
      const dailyPrices = parseHourlyValuesToDailyValues(data.prices)
      const dailyVolumes = parseHourlyValuesToDailyValues(data.total_volumes)
      setBearishTrend(bearishRunCalculator(dailyPrices))
      setTradingVolume(highestValue(dailyVolumes))
      setBestDays(bestDaysToBuyAndSell(dailyPrices))
    }
    else if (rangeLength > 90){
      setBearishTrend(bearishRunCalculator(data.prices))
      setTradingVolume(highestValue(data.total_volumes))
      setBestDays(bestDaysToBuyAndSell(data.prices))
    }}

  return (
    <div>
      <Heading>
        <HeadingText>Crypto Analyzer</HeadingText>
      </Heading>
      <MainContainer>
        <Text>Choose date range to analyze Bitcoin</Text>
        <Container>
          <Container>
            <StyledInput type="date" onChange={(e) => setFromDate(e.target.value)}></StyledInput>
            <StyledInput type="date" onChange={(e) => setToDate(e.target.value)}></StyledInput>
            <StyledButton onClick = {() => getCoinData(fromDate, toDate)}><Text>Start</Text></StyledButton>
          </Container>
        </Container>
        {errorMessage && <ErrorMessage><Text>{errorMessage}</Text></ErrorMessage>}
        <DataContainer>
          {bearishTrend  && <Text>Longest bearish trend: {bearishTrend} days</Text>}
          {tradingVolume && <Text>Highest trading volume date: {unixToDate(tradingVolume[0]).toDateString()} EUR: {tradingVolume[1]}</Text>}
          {bestDays && <Text>Best day to buy: {unixToDate(bestDays.cheapest[0]).toDateString()} Price EUR: {bestDays.cheapest[1]} </Text>}
          {bestDays && <Text>Best day to sell: {unixToDate(bestDays.highest[0]).toDateString()} Price EUR: {bestDays.highest[1]} </Text> }
          {bestDays && bestDays.cheapest[1] === bestDays.highest[1] && <Text style={{ color: 'red' }}>Price is only decreasing at this date range, there is no good day to buy and sell with profit</Text> }
        </DataContainer>
      </MainContainer>
    </div>
  )
}

export default App
