describe('login logout correctly', () => {
  it('should submit form correctly and be logged in', () => {
    cy.request('POST', 'http://localhost:6001/account/create', {
      email: "fake.guy@fakeemailserviceprovider.internet",
      password: "ASFDasdfasdf1!",
      schoolId: "12345678",
      active: "true",
      role: "student",
      firstName: "Fake",
      lastName: "Guy",
      school: "Weber State University"
    });

    // go to page
    cy.visit('');

    // page should display
    expect(cy.get('h1').should('have.text', 'Log In'));

    // fill out values
    cy.get('#username').type('fake.guy@fakeemailserviceprovider.internet');
    cy.get('#password').type("ASFDasdfasdf1!");

    // wait for a sec, then submit
    cy.wait(2000);
    cy.get('form').submit();

    // should be on login page
    expect(cy.get('.Edit_header').should('have.text', 'Your Dashboard'));

    // name should be visible
    expect(cy.get('a').contains('Welcome, ').should('have.text', 'Welcome, Fake Guy'));

    // session storage should be set, can check with cy.window()
    cy.window().then(win=> {
      const someItem = win.sessionStorage.getItem('firstName');
      cy.wrap(someItem).should('exist');
    });

    // wait for a sec, then logout
    cy.wait(2000);
    cy.get('a').contains('Logout').click();

    // should be back to log in page
    expect(cy.get('h1').should('have.text', 'Log In'));

    // session storage should have been cleared out
    cy.window().then(win=> {
      const someItem = win.sessionStorage.getItem('firstName');
      cy.wrap(someItem).should('not.exist');
    });
  })
})
