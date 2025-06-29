
describe('Adding New User', () => {
    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com');
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin');
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123');
        cy.get('.oxd-button').click();
        cy.get(':nth-child(1) > .oxd-main-menu-item > .oxd-text').contains('Admin').click();
        cy.url().should('include', '/admin/viewSystemUsers');
    })
    it('should add a new user successfully', () => {
        cy.get('.oxd-button--secondary').contains('Add').click();
        
    })
    // it('should display an error message when trying to add a user with an existing username', () => {
    //     cy.get('.oxd-button--secondary').contains('Add').click();

    // })
})