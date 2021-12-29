/* eslint-disable no-console */
export const unixToDate = (unix) => {
  const date = new Date(unix)
  return date.toDateString()
  // console.log(date.toLocaleDateString('en-GB'))

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
  console.log('longest', longest)
  return longest
}

export const highestTradingVolume = (volumes) => {
  const largest =  volumes.reduce((largest,current) => {
    if (largest[1] < current[1]) {
      largest = current
    }
    return largest
  })
  // console.log('the real largest', largest)
  const date = unixToDate(largest[0])
  const eur = largest[1]
  console.log('date',date, 'eur', eur)
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
  console.log('dayStoCompare', daysToCompare)

  const bestDays = bestDaysFinder(daysToCompare)
  console.log('besdays from calculator', bestDays)
  return bestDays

}