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


  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'test' })
    })
  
    it('A blog can be created', function() {
      cy.createBlog({title: "test titke", author: "test Author"})
      cy.contains('test titke')
    })

    it('user can like a block', function() {
      cy.createBlog({title: "test title", author: "test Author"})
      cy.get('#showExtraBtn').click().then(() => {
        cy.get('#likeBtn').click().then(() => {
          cy.get('#likes').contains('1')
        })
      })
    })

    it('the user who created a blog can delete it', function() {
      cy.createBlog({title: "test title", author: "test Author"})
      cy.get('#showExtraBtn').click().then(() => {
        cy.get('#removeBtn').click()
        cy.contains('test title').should('not.exist')
      })
    })
  })

  describe('multiple users', function() {
    it('only the creator can see the delete button of a blog', function() {
      const user = {
        name: "test2",
        username: "test2",
        password: "test2",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
      // log in as test 1 create a blog ans get delete btn
      cy.login({ username: 'test', password: 'test' })
      cy.createBlog({title: "test title", author: "test Author"})
      cy.get('#showExtraBtn').click()
      cy.get('#removeBtn')

      cy.login({ username: 'test2', password: 'test2' })
      cy.get('#showExtraBtn').click()
      cy.get('#removeBtn').should('not.exist')
    })
  })

  describe('multiple blogs', function() {
    it.only('the blogs are ordered according to likes', function() {
      cy.login({ username: 'test', password: 'test' })
      cy.createBlog({title: "test title 10", author: "test Author", likes: 10})
      cy.createBlog({title: "test title 10", author: "test Author", likes: 10})
      cy.createBlog({title: "test title 9", author: "test Author", likes: 9})

      cy.get('#blogsContainer').children().eq(0).should('contain', 'test title 10')

      cy.get('#blogsContainer').children().eq(2).find('#showExtraBtn').click()
      cy.get('#blogsContainer').children().eq(2).find('#likeBtn').click()
      cy.wait(500)
      cy.get('#blogsContainer').children().eq(2).find('#likeBtn').click()

      cy.get('#blogsContainer').children().eq(0).should('contain', 'test title 9')

    })
  })
})



