export const unixToDate = (unix) => {
  const date = new Date(unix)
  return date
}

export const dateToUnix = (date) => {
  const parts = date.split('-')
  const unix = Date.UTC(Number(parts[0]), Number(parts[1])-1, Number(parts[2]))/1000
  return unix.toString()
}

export const addHourToUnix = (unix) =>  {
  const addedUnix = Number(unix) + 3600
  return addedUnix.toString()
}

export const rangeLengthInDays = (fromUnix, toUnix) => {
  const rangeLength = Math.floor((toUnix - fromUnix)/86400)
  return rangeLength
}

export const bearishRunCalculator = (prices) => {
  let longest = 0
  let current = 0
  prices.forEach((element,index,array) => {
    if(index +1 < array.length)
      if(array[index+1][1] < element[1])
        current += 1
      else if (array[index+1][1] >= element[1])
        current = 0
    if( longest < current)
      longest = current
  })
  return longest
}

export const highestValue = (datesAndValues) => {
  const values = datesAndValues.map(element => element[1])
  const max = Math.max(...values)
  const index = values.indexOf(max)
  const highest = datesAndValues[index]
  return highest
}

const bestDaysFinder = (daysToCompare) => {
  const bestDays = daysToCompare.reduce((bestPercentage, current) => {
    if (current.marginPercentage > bestPercentage.marginPercentage){
      bestPercentage = current
    }
    return bestPercentage
  })
  return bestDays
}

export const bestDaysToBuyAndSell = (prices) => {
  let daysToCompare = []
  const initialValue = [1,10000000]
  let cheapest = initialValue
  prices.forEach((current, index, array) => {
    if(index +1 < array.length)
      if(current[1] < cheapest[1]){
        const restPrices = prices.slice(index)
        const highest =  highestValue(restPrices)
        const log = {
          cheapest: current,
          highest: highest,
          marginPercentage: (highest[1]/current[1])*100-100,
          index:index
        }
        daysToCompare  = daysToCompare.concat(log)
        cheapest = current
      }
    return cheapest
  })
  const bestDays = bestDaysFinder(daysToCompare)
  return bestDays
}

export const getUTCDateHours = (dateAndPrice) => {
  const date = unixToDate(dateAndPrice[0]).getUTCDate()
  const hours = unixToDate(dateAndPrice[0]).getUTCHours()
  return { date, hours, dateAndPrice }
}

export const parseHourlyValuesToDailyValues = (datesAdnPrices) => {
  let dailyValues = []
  let dailyValue = datesAdnPrices[0]
  datesAdnPrices.forEach((current, index, array) => {
    if(index === array.length-1)
      dailyValues.push(current)
    if(index +1 < array.length) {
      const currentDH =  getUTCDateHours((current))
      const nextDH = getUTCDateHours((array[index+1]))
      const dailyValueDH = getUTCDateHours((dailyValue))
      if (nextDH.date !== currentDH.date){
        dailyValues.push(dailyValue)
        dailyValue = current
      }
      if(nextDH.date === currentDH.date)
        if (currentDH.hours < dailyValueDH.hours)
          dailyValue = current
    }
  })
  return dailyValues
}