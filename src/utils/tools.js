
export const unixToDate = (unix) => {
  const date = new Date(unix)
  return date
}

export const dateToUnix = (date, isToDate) => {
  const parts = date.split('-')
  const unix = Date.UTC(Number(parts[0]), Number(parts[1])-1, Number(parts[2]), isToDate && 1)/1000
  return unix.toString()
}

export const rangeLengthInDays = (fromUnix, toUnix) => {
  const rangeLength = Math.floor((fromUnix - toUnix)/86400)
  return rangeLength
}

export const bearishRunCalculator = (prices) => {
  let longest = 0
  prices.reduce((first, current, index, array) => {
    if(index +1 < array.length) {
      if(array[index+1][1] < current[1]){
        first = first +1
      }
      else if (array[index+1][1] >= current[1]){
        first = 0
      }
    }
    if( longest < first){
      longest = first
    }
    return first
  },0)
  return longest
}

export const highestTradingVolume = (volumes) => {
  const largest =  volumes.reduce((largest,current) => {
    if (largest[1] < current[1]) {
      largest = current
    }
    return largest
  })
  return largest
}

const highestPrice = (restPrices) => {
  const highest = restPrices.reduce((highest, cur) => {
    if (cur[1] > highest[1]){
      highest = cur
    }
    return highest
  })
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
  let daysToCompare =[]
  const initialValue = [1,1000000]

  prices.reduce((cheapest, current, index) => {
    if (current[1] < cheapest[1]) {
      const restPrices = prices.slice(index)
      const highest =  highestPrice(restPrices, cheapest)
      const log = {
        cheapest: current,
        highest: highest,
        marginPercentage: (highest[1]/current[1])*100-100,
        index:index
      }
      daysToCompare.push(log)
      cheapest = current
    }
    return cheapest
  },initialValue)
  const bestDays = bestDaysFinder(daysToCompare)
  return bestDays

}

const getUTCDateHours = (dateAndPrice) => {
  const date = unixToDate(dateAndPrice[0]).getUTCDate()
  const hours = unixToDate(dateAndPrice[0]).getUTCHours()
  return { date, hours, dateAndPrice }
}

export const parseHourlyValuesToDailyValues = (prices) => {
  let dailyValues = []
  prices.reduce((dailyValue, current, index, array) => {
    const previousDH = getUTCDateHours((array[index-1]))
    const currentDH =  getUTCDateHours((current))
    const dailyValueDH = getUTCDateHours((dailyValue))
    if (currentDH.date !== previousDH.date) {
      dailyValues.push(dailyValue)
      dailyValue = current
      if(index === array.length-1) {
        dailyValues.push(dailyValue)
      }
    }
    if (currentDH.date === previousDH.date){
      if (currentDH.hours < dailyValueDH.hours){
        dailyValue = current
      }
    }
    return dailyValue
  })
  return dailyValues
}
