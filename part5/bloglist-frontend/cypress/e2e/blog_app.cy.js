describe("Blog app", function () {
  beforeEach(function() {
    cy.createTestUser()
  })
  it("front page can be opened", function () {
    cy.visit("http://localhost:5173");
    cy.contains("blogs");
    cy.contains('login')
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'test', password: 'test' })
      cy.contains('test logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('wriong')
      cy.get('#login-btn').click()
      cy.contains('login')
    })
  })
})




// describe('when logged in', function() {
//   beforeEach(function() {
//     cy.createTestUser()
//     cy.login({ username: 'test', password: 'test' })
//   })

//   it('a new note can be created', function() {
//     // ...
//   })

// })
