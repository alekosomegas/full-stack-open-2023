describe("Blog app", function () {
  beforeEach(function() {
    cy.createTestUser()

  })
  it.only("front page can be opened", function () {
    cy.visit("http://localhost:5173");
    cy.contains("blogs");
    cy.contains('login')
  });
})


describe('when logged in', function() {
  beforeEach(function() {
    cy.createTestUser()
    cy.login({ username: 'test', password: 'test' })
  })

  // it('a new note can be created', function() {
  //   // ...
  // })

})
