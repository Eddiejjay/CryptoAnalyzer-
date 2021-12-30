import React, { useState } from 'react'
import { unixToDate, dateToUnix, rangeLengthInDays,  highestTradingVolume,
  bestDaysToBuyAndSell, bearishRunCalculator, parseHourlyValuesToDailyValues } from './utils/tools'
import { StyledInput, StyledButton, Text, HeadingText,
  Container, Heading, MainContainer, DataContainer } from './components/StyledComponents'
import { getData } from './services/CoinGeckoService'

const App = () => {
  const [bearishTrend, setBearishTrend] = useState(null)
  const [tradingVolume, setTradingVolume] = useState(null)
  const [bestDays, setBestDays] = useState(null)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const getCoinData = async (fromDate, toDate) => {
    const isToDate = true
    const isFromDate = false
    const from = dateToUnix(fromDate, isFromDate)
    const to = dateToUnix(toDate, isToDate)
    const rangeLength = rangeLengthInDays(to,from)
    const data  = await getData(from,to, 'EUR')
    dataParser(rangeLength, data)
  }

  const dataParser = (rangeLength, data) => {
    if (rangeLength >= 1 && rangeLength <= 90){
      const dailyPrices = parseHourlyValuesToDailyValues(data.prices)
      const dailyVolumes = parseHourlyValuesToDailyValues(data.total_volumes)
      setBearishTrend(bearishRunCalculator(dailyPrices))
      setTradingVolume(highestTradingVolume(dailyVolumes))
      setBestDays(bestDaysToBuyAndSell(dailyPrices))
    }
    else if (rangeLength > 90){
      setBearishTrend(bearishRunCalculator(data.prices))
      setTradingVolume(highestTradingVolume(data.total_volumes))
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
            <StyledButton onClick = {() => getCoinData(fromDate, toDate)}><Text>Get data</Text></StyledButton>
          </Container>
        </Container>
        <DataContainer>
          {bearishTrend >= 0 && <Text>Longest bearish trend: {bearishTrend} days</Text>}
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
