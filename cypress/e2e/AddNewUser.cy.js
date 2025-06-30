
describe('Adding new user', () => {
    // Login to OrangeHRM before each test case
    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com');
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin');
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123');
        cy.get('.oxd-button').click();
    })

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
                cy.wrap(data.FirstName).as('firstName');
                cy.wrap(data.MiddleName).as('middleName');
                cy.wrap(data.LastName).as('lastName');
                cy.wrap(data.EmployeeId).as('employeeId');
            }); 
        });

        cy.get('@firstName').then((firstName) => {
            cy.log('First Name: ' + firstName);
        });
        


      
        // Interc ept the POST request to capture the request and response data
        // cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/systemUsers').as('postNewUser');

        // Navigate to the Admin section and add a new user
        cy.get(':nth-child(1) > .oxd-main-menu-item > .oxd-text').contains('Admin').click();
        cy.url().should('include', '/admin/viewSystemUsers');
        cy.get('.oxd-button--secondary').contains('Add').click();
        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
        cy.contains('.oxd-select-option', 'ESS').click();
        cy.get('.oxd-autocomplete-text-input > input').type('DemoUser_1504  test');
        // cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
        // cy.contains('.oxd-select-option', 'Enabled').click();
        // cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type('johndoe');
        // cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('password123');
        // cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('password123');
        // // Save the new user details
        // cy.get('.oxd-button--secondary').contains('Save').click();
        // // Verify that the user was added successfully
        // cy.get('.oxd-toast').should('contain', 'Successfully Saved');







        // Wait for the POST request to complete and log the request and response data
        // cy.wait('@postNewUser').then((interception) => {
        //     // Check if the request was successful       
        //     expect(interception.response.statusCode).to.eq(200);
        //     // Check if the request body contains the expected data
        //     const requestBody = interception.request.body;
        //     const responseBody = interception.response.body;
        //     // Log the request and response bodies to the Cypress console

        //     cy.log('Request Body:', JSON.stringify(requestBody));
        //     cy.log('Response Body:', JSON.stringify(responseBody));
        //     // Optionally, you can assert specific properties in the response
        //     expect(responseBody.data).to.have.property('id');
        //     expect(responseBody.data.id).to.not.be.undefined;
        //     if (expect(responseBody.data.id).to.not.be.undefined) {  
        //         cy.wrap(responseBody.data.id).as('userId'); // Store userId for later use
        //     } else {     
        //         cy.log('userId is undefined in the response');
        //     }
        // });

    })
    // it('should display an error message when trying to add a user with an existing username', () => {
    //     cy.get('.oxd-button--secondary').contains('Add').click();

    // })
})