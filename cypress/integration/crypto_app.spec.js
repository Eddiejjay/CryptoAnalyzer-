/* eslint-disable no-undef */
describe('Crypo test', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Hello')
    cy.contains('Vincit')
  })
})