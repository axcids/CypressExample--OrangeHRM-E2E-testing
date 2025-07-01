
describe('Adding new user', () => {
    // Login to OrangeHRM before each test case
    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com');
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin');
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123');
        cy.get('.oxd-button').click();
    })
    it('should not add a new employee if all fields are empty', () => {
        // Navigate to the Admin section and add a new user
        cy.get(':nth-child(1) > .oxd-main-menu-item > .oxd-text').contains('Admin').click();
        cy.url().should('include', '/admin/viewSystemUsers');
        cy.get('.oxd-button--secondary').contains('Add').click();
        cy.url().should('include', '/admin/saveSystemUser');
        // Click the Save button without filling any fields
        cy.get('.oxd-button--secondary').contains('Save').click();
        // Verify that all required fields are highlighted with an error message
        cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > .oxd-text').should('contain', 'Required');
        cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > .oxd-text').should('contain', 'Required');
        cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('contain', 'Required');
        cy.get(':nth-child(4) > .oxd-input-group > .oxd-text').should('contain', 'Required');
        cy.get('.user-password-cell > .oxd-input-group > .oxd-text').should('contain', 'Required');
        cy.get('.user-password-cell > .oxd-input-group > .oxd-text').should('contain', 'Required');   
    }); 
    // This test case is for adding a new ESS user in OrangeHRM
    it('should add a new ESS user successfully', () => {
        
        // Retrieve empNumber from the previous test case 
        cy.readFile('cypress/fixtures/empNumber.json').then((data) => {
            expect(data.empNumber).to.not.be.undefined; // Ensure empNumber is defined
            cy.wrap(data.empNumber).as('empNumber'); // Store empNumber for later use
        }); 
        //
        cy.get('@empNumber').then((empNumber) => {
            cy.log('Using empNumber: ' + empNumber);
            cy.readFile('cypress/fixtures/employee-details-log/empolyeedetails_'+empNumber+'.json').then((data) => {
                const empNumber = data.empNumber;
                const firstName = data.firstName;
                const middleName = data.middleName;
                const lastName = data.lastName;
                const employeeId = data.employeeId;

                // Interc ept the POST request to capture the request and response data
                cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users').as('postNewUser');

                // Navigate to the Admin section and add a new user
                cy.get(':nth-child(1) > .oxd-main-menu-item > .oxd-text').contains('Admin').click();
                cy.url().should('include', '/admin/viewSystemUsers');
                cy.get('.oxd-button--secondary').contains('Add').click();
                cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
                cy.contains('.oxd-select-option', 'ESS').click();
                cy.get('.oxd-autocomplete-text-input > input').type(firstName);
                cy.wait(3000); // Wait for the autocomplete options to load
                cy.contains(firstName).click()
                cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
                cy.contains('.oxd-select-option', 'Enabled').click();
                cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type('johndoe' + employeeId); // Use employeeId to create a unique username
                cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('password123');
                cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('password123');
                // // Save the new user details
                cy.get('.oxd-button--secondary').contains('Save').click();
                // Verify that the user was added successfully
                cy.get('.oxd-toast').should('contain', 'Successfully Saved');
                // Wait for the POST request to complete and log the request and response data
                cy.wait('@postNewUser').then((interception) => {
                
                    // Check if the request was successful       
                    expect(interception.response.statusCode).to.eq(200);
                    // Define request and response data in variables
                    const requestBody = interception.request.body;
                    const responseBody = interception.response.body;
                    // Log the request and response bodies to the Cypress console
                    cy.log('Request Body:', JSON.stringify(requestBody));
                    cy.log('Response Body:', JSON.stringify(responseBody));
                    // Optionally, you can assert specific properties in the response

                });
            }); 
        });
    })
    it('should not add a new ESS user if all fields are empty', () => {

        // Interc ept the POST request to capture the request and response data
        cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users').as('postNewUser');

        // Navigate to the Admin section and add a new user
        cy.get(':nth-child(1) > .oxd-main-menu-item > .oxd-text').contains('Admin').click();
        cy.url().should('include', '/admin/viewSystemUsers');
        cy.get('.oxd-button--secondary').contains('Add').click();
        cy.url().should('include', '/admin/saveSystemUser');
        // Click the Save button without filling any fields
        cy.get('.oxd-button--secondary').contains('Save').click();
        
        // Wait for the POST request to complete and log the request and response data
        cy.wait('@postNewUser').then((interception) => {
            // Check if the request was successful       
            expect(interception.response.statusCode).to.eq(200);
            // Define request and response data in variables
            const requestBody = interception.request.body;
            const responseBody = interception.response.body;
            // Log the request and response bodies to the Cypress console
            cy.log('Request Body:', JSON.stringify(requestBody));
            cy.log('Response Body:', JSON.stringify(responseBody));
            // Optionally, you can assert specific properties in the response

        });
    }); 
    it('should add a new Admin user successfully', () => {
        
        // Retrieve empNumber from the previous test case 
        cy.readFile('cypress/fixtures/empNumber.json').then((data) => {
            expect(data.empNumber).to.not.be.undefined; // Ensure empNumber is defined
            cy.wrap(data.empNumber).as('empNumber'); // Store empNumber for later use
        }); 
        //
        cy.get('@empNumber').then((empNumber) => {
            cy.log('Using empNumber: ' + empNumber);
            cy.readFile('cypress/fixtures/employee-details-log/empolyeedetails_'+empNumber+'.json').then((data) => {
                const empNumber = data.empNumber;
                const firstName = data.firstName;
                const middleName = data.middleName;
                const lastName = data.lastName;
                const employeeId = data.employeeId;

                // Interc ept the POST request to capture the request and response data
                cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users').as('postNewUser');

                // Navigate to the Admin section and add a new user
                cy.get(':nth-child(1) > .oxd-main-menu-item > .oxd-text').contains('Admin').click();
                cy.url().should('include', '/admin/viewSystemUsers');
                cy.get('.oxd-button--secondary').contains('Add').click();
                cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input').click();
                cy.contains('.oxd-select-option', 'Admin').click();
                cy.get('.oxd-autocomplete-text-input > input').type(firstName);
                cy.wait(3000); // Wait for the autocomplete options to load
                cy.contains(firstName).click()
                cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
                cy.contains('.oxd-select-option', 'Enabled').click();
                cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type('jeffdoe' + employeeId); // Use employeeId to create a unique username
                cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('password123');
                cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('password123');
                // // Save the new user details
                cy.get('.oxd-button--secondary').contains('Save').click();
                // Verify that the user was added successfully
                cy.get('.oxd-toast').should('contain', 'Successfully Saved');
                // Wait for the POST request to complete and log the request and response data
                cy.wait('@postNewUser').then((interception) => {
                
                    // Check if the request was successful       
                    expect(interception.response.statusCode).to.eq(200);
                    // Define request and response data in variables
                    const requestBody = interception.request.body;
                    const responseBody = interception.response.body;
                    // Log the request and response bodies to the Cypress console
                    cy.log('Request Body:', JSON.stringify(requestBody));
                    cy.log('Response Body:', JSON.stringify(responseBody));
                    // Optionally, you can assert specific properties in the response

                });
            }); 
        });
    })
})