describe('OrangeHRM Login Functionality', () => { 
  it('should login successfully with valid credentials', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com')
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin')
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123')
    cy.get('.oxd-button').click()
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('contain', 'Dashboard')
  })
  
  it('should display an error message for invalid credentials due to invalid username', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com')
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin1')
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123')
    cy.get('.oxd-button').click()
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials')
  })

  it('should display an error message for invalid credentials due to invalid password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com')
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin')
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin1234')
    cy.get('.oxd-button').click()
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials')
  })
  it('should display an error message for invalid credentials due to empty username', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com')
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123')
    cy.get('.oxd-button').click()
    cy.get('.oxd-input-group > .oxd-text').should('contain', 'Required')
  })
  it('should display an error message for invalid credentials due to empty password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com')
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin')
    cy.get('.oxd-button').click()
    cy.get('.oxd-input-group > .oxd-text').should('contain', 'Required')
  })
  it('should display an error message for invalid credentials due to empty username and password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com')
    cy.get('.oxd-button').click()
    cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('contain', 'Required')
    cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('contain', 'Required')
  })
})