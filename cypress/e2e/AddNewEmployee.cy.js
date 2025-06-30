
describe('Adding new employee', () => {
    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com');
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin');
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123');
        cy.get('.oxd-button').click();
    })
    it('should add a new employee successfully', () => {
        // Intercept the POST request to capture the request and response data
        cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees').as('postNewEmployee');
        // Navigate to the PIM section and add a new employee
        cy.get(':nth-child(2) > .oxd-main-menu-item > .oxd-text').contains('PIM').click();
        cy.url().should('include', '/pim/viewEmployeeList');
        cy.get('.orangehrm-header-container > .oxd-button').contains('Add').click();
        cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').type('John');
        cy.get(':nth-child(2) > :nth-child(2) > .oxd-input').type('M');
        cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').type('Doe');
        cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').type('01255');
        // Save the new employee details
        cy.get('.oxd-button--secondary').contains('Save').click();
        // Verify that the employee was added successfully
        cy.get('.oxd-toast').should('contain', 'Successfully Saved');
        // Wait for the POST request to complete and log the request and response data
        cy.wait('@postNewEmployee').then((interception) => {
            // Check if the request was successful
            expect(interception.response.statusCode).to.eq(200);
            // Check if the request body contains the expected data
            // Define request and response data in variables
            const requestBody = interception.request.body;
            const responseBody = interception.response.body;
            const empNumber = responseBody.data.empNumber;
            // Log the request and response bodies to the Cypress console
            cy.log('Request Body:', JSON.stringify(requestBody));
            cy.log('Response Body:', JSON.stringify(responseBody))
            // Optionally, you can assert specific properties in the response
            expect(responseBody.data).to.have.property('empNumber');
            expect(responseBody.data.empNumber).to.not.be.undefined;
            if(expect(responseBody.data.empNumber).to.not.be.undefined){
                cy.wrap(responseBody.data.empNumber).as('empNumber'); // Store empNumber for later use
                // Save employee details to a file
                cy.writeFile('cypress/fixtures/employee-details-log/empolyeedetails_'+empNumber+'.json', {
                    // Map the employee details in the file
                    empNumber: responseBody.data.empNumber,
                    firstName: responseBody.data.firstName,
                    middleName: responseBody.data.middleName,
                    lastName: responseBody.data.lastName,
                    employeeId: responseBody.data.employeeId,
                }); 
                // Save empNumber to a file
                cy.writeFile('cypress/fixtures/empNumber.json', {
                    empNumber: responseBody.data.empNumber
                });
            }else{
                cy.log('empNumber is undefined in the response');
            }
        });
        // Verify that the employee's personal details page is displayed
        cy.get('@empNumber').then((empNumber) => {
            // Use the empNumber to navigate to the employee's personal details page
            cy.url().should('include', '/pim/viewPersonalDetails/empNumber/' + empNumber);
        });
    })
})