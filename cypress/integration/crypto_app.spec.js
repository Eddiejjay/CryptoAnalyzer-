/* eslint-disable no-undef */
describe('Crypo test', function() {
  it('Front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Crypto')
    cy.contains('Analyzer')
  })

  it('After date inputs filled and start pressed, data is on the page date range under 90 days', function() {
    cy.visit('http://localhost:3000')
    cy.get('input:first').type('2020-01-01')
    cy.get('input:last').type('2020-01-15')
    cy.contains('Start').click()
    cy.contains('Longest bearish trend: 2 days')
    cy.contains('Highest trading volume date: Wed Jan 15 2020 EUR: 49773033050.53791')
    cy.contains('Best day to buy: Fri Jan 03 2020 Price EUR: 6234.201691113153')
    cy.contains('Best day to sell: Wed Jan 15 2020 Price EUR: 7910.127234921121')
  })

  it('After date inputs filled and start pressed, data is on the page date range over 90 days', function() {
    cy.visit('http://localhost:3000')
    cy.get('input:first').type('2020-01-01')
    cy.get('input:last').type('2021-01-15')
    cy.contains('Start').click()
    cy.contains('Longest bearish trend: 7 days')
    cy.contains('Highest trading volume date: Mon Jan 04 2021 EUR: 146032480261.85092')
    cy.contains('Best day to buy: Tue Mar 17 2020 Price EUR: 4509.855956130319')
    cy.contains('Best day to sell: Sat Jan 09 2021 Price EUR: 33401.61993597576')
  })
})

