import { dateToUnix, unixToDate, rangeLengthInDays, getUTCDateHours } from './tools.js'
import '@testing-library/jest-dom/extend-expect'

test('unixToDate return righ value', () => {
  const unix = 1640952781000
  const result = unixToDate(unix).toDateString()
  expect(result).toMatch('Fri Dec 31 2021')
})

test('dateToUnix returns right value', () => {
  const date = '2021-02-01'
  const isFromDate = false
  const result = dateToUnix(date, isFromDate)
  expect(result).toMatch('1612137600')
})

test('rangeLengthInDays returns right value', () => {
  const rangeStartUnix = 1638316800
  const rangeEndUnix = 1639094400
  const result = rangeLengthInDays(rangeStartUnix, rangeEndUnix)
  expect(result).toBe(9)
})

test('getUTCDateHours returns right value', () => {
  const dateAndPrice = [1608681600000, 19533.859665926884]
  const result = getUTCDateHours(dateAndPrice)

  expect(result).toEqual({ date:23, hours:0, dateAndPrice:[1608681600000, 19533.859665926884] })
})


