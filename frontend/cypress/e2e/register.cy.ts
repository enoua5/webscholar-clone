describe('test successful registration end-to-end', () => {
  it('should register correctly and be logged in, then log out correctly', () => {
    // mock API response from /create
    // we can assume that a call to /login will return an account object
    cy.intercept('POST', 'http://localhost:6001/account/create', {
      statusCode: 200,
      body: {
        firstName: "Fake",
        lastName: "Guy",
        email: "fake.guy@fakeemailserviceprovider.internet",
        phoneNumber: "555-555-5555",
        city: "Ogden",
        state: "UT",
        zipCode: "11111",
        schoolId: "12345678",
        major: "CS",
        accountKey: "1",
        role: "student",
        school: "Weber State University",
        active: "true"
      },
    })
    // mock API response from /emailExists
    // we can assume that a call to /emailExists will return false
    cy.intercept('GET', 'http://localhost:6001/account/emailExists*', {
      statusCode: 200,
      body: false
    })

    cy.visit('')

    // navigate to registration
    cy.get('a').contains('Register').click();

    // page should display
    expect(cy.get('h1').should('have.text', 'Register a New Account'));

    // fill out values
    cy.get('#email').type('fake.guy@fakeemailserviceprovider.internet');
    cy.get('#password').type('ASDFasdfasd1!');
    cy.get('#confirm_password').type('ASDFasdfasd1!');
    cy.get('#first_name').type('Fake');
    cy.get('#last_name').type('Guy');
    cy.get('#user_id').type('12345678');
    cy.get('input[type="checkbox"').click();

    // wait for a sec, then submit
    cy.wait(2000);
    cy.get('form').submit();

    // should be on dashboard page
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
