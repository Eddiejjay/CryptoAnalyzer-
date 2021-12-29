/* eslint-disable no-console */
import React, { useState } from 'react'
import axios from 'axios'
import { unixToDate, dateToUnix, rangeLengthInDays,  highestTradingVolume,
  bestDaysToBuyAndSell, bearishRunCalculator } from './utils/converters'
import { StyledInput, StyledButton, Text, HeadingText,
  Container, Heading, MainContainer, DataContainer } from './components/StyledComponents'


// 5 minutes data only last day
// hourly data 1-90




const App = () => {
  const [bearishTrend, setBearishTrend] = useState(0)
  const [tradingVolume, setTradingVolume] = useState(null)
  const [bestDays, setBestDays] = useState(null)
  const [fromDate, setFromDate] = useState('')
  // const [fromTime, setFromTime] = useState('')
  const [toDate, setToDate] = useState('')
  // const [toTime, setToTime] = useState('')
  console.log('fromdAte', fromDate)
  // console.log('fromtime', fromTime)
  console.log('toDate', toDate)
  // console.log('toTime', toTime)
  // marginPercentage: (highest[1]/cheapest[1]),

  const getData = async (fromDate, toDate) => {
    const isToDate = true
    const isFromDate = false

    const from = dateToUnix(fromDate, isFromDate)
    const to = dateToUnix(toDate, isToDate)
    const rangeLength = rangeLengthInDays(to,from)

    console.log('rangleLength in days ', rangeLength)
    console.log('from', from)
    console.log('to', to)
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${from}&to=${to}`)
    console.log('Response', response)
    dataParser(rangeLength, response.data)

  }

  const dataParser = (rangeLength, data) => {
    console.log('ranfelegsh',rangeLength)
    if (rangeLength >= 1 && rangeLength <= 90)
      console.log('dataparser 1-90', data.prices.length)
    else if (rangeLength > 90){
      console.log('dataparser > 90', data.prices.length)
      setBearishTrend(bearishRunCalculator(data.prices))
      setTradingVolume(highestTradingVolume(data.total_volumes))
      setBestDays(bestDaysToBuyAndSell(data.prices))
      console.log('bestDays from app', bestDays)

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
            {/* <StyledInput type="time" onChange={(e) => setFromTime(e.target.value)}></StyledInput> */}
            <StyledInput type="date" onChange={(e) => setToDate(e.target.value)}></StyledInput>
            {/* <input type="time" onChange={(e) => setToTime(e.target.value)}></input> */}
            <StyledButton onClick = {() => getData(fromDate, toDate)}><Text>Get data</Text></StyledButton>
          </Container>
        </Container>
        <DataContainer>
          {bearishTrend && <Text>Longest bearish trend in days {bearishTrend}</Text>}
          {tradingVolume&& <Text>Highest trading volume date {unixToDate(tradingVolume[0])} eur {tradingVolume[1]}</Text>}
          {bestDays && <Text>Best day to buy {unixToDate(bestDays.cheapest[0])} price {bestDays.cheapest[1]} </Text>}
          {bestDays && <Text>Best day to sell {unixToDate(bestDays.highest[0])} price {bestDays.highest[1]} </Text> }
        </DataContainer>
      </MainContainer>
    </div>
  )
}

export default App
