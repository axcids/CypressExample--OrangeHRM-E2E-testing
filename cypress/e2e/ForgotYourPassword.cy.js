describe('OrangeHRM Login Functionality', () => {
  
  it('should redirect user to forgot page', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com')
    cy.get('.orangehrm-login-forgot > .oxd-text').click()
    cy.url().should('include', '/auth/requestPasswordResetCode')
  })
  it('should display an error message for empty email', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com')
        cy.get('.orangehrm-login-forgot > .oxd-text').click()
        cy.get('.oxd-button--secondary').click()
        cy.get('.oxd-input-group > .oxd-text').should('contain', 'Required')
    })
    it('should display a success message for valid email', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com')
        cy.get('.orangehrm-login-forgot > .oxd-text').click()
        cy.get('.oxd-input').type('test@test.com')
        cy.get('.oxd-button--secondary').click()
        cy.get('.oxd-text--h6').should('contain', 'Reset Password link sent successfully')
    })
    
})