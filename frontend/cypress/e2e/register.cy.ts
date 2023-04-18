describe('test unsuccessful and successful registration end-to-end', () => {
  beforeEach(() => {
    cy.visit('')

    // navigate to registration
    cy.get('a').contains('Register').click();
  });

  it('should not register with already taken email', () => {
    // mock API response from /emailExists
    // we can assume that a call to /emailExists will return true
    cy.intercept('GET', 'http://localhost:6001/account/emailExists*', {
      statusCode: 200,
      body: true
    })

    // fill out email
    cy.get('#email').type('fake.guy@fakeemailserviceprovider.internet');
    // need to click away to fire email.touched
    cy.get('#password').click();
    // expect correct error to display
    expect(cy.get('div.error').should('have.text', 'Email is already taken.'));

    // button should be disabled
    expect(cy.get('input.button').invoke('attr', 'disabled').should('exist'));

    cy.wait(2000);
  });

  it('should not register with bad input', () => {
    // fill out email
    cy.get('#email').type('bad email');
    // click away
    cy.get('#password').click();
    // expect error message
    expect(cy.get('div').contains('Please enter a valid email address.').should('exist'));

    // fill out password
    cy.get('#password').type('badpassword');
    // click away
    cy.get('#email').click();
    // expect error message
    expect(cy.get('div').contains('Password must fulfill all criteria.').should('exist'));

    // fill out second password
    cy.get('#confirm_password').type('badpassword2');
    // click away
    cy.get('#email').click();
    // expect error message
    expect(cy.get('div').contains('Passwords do not match.').should('exist'));

    // fill out student id
    cy.get('#user_id').type('123456789');
    // click away
    cy.get('#email').click();
    // expect error message
    expect(cy.get('div').contains('Student ID must contain exactly 8 numbers.').should('exist'));

    // button should be disabled
    expect(cy.get('input.button').invoke('attr', 'disabled').should('exist'));

    cy.wait(2000);
  });

  it('should not register with no input', () => {
    // touch all fields
    cy.get('#email').click();
    cy.get('#password').click();
    cy.get('#confirm_password').click();
    cy.get('#first_name').click();
    cy.get('#last_name').click();
    cy.get('#user_id').click();
    cy.get('#email').click();

    // errors for required input should exist
    expect(cy.get('div').contains('Email is required.').should('exist'));
    expect(cy.get('div').contains('Password is required.').should('exist'));
    expect(cy.get('div').contains('Please confirm the password.').should('exist'));
    expect(cy.get('div').contains('First name is required.').should('exist'));
    expect(cy.get('div').contains('Last name is required.').should('exist'));
    expect(cy.get('div').contains('Student ID is required.').should('exist'));

    // button should be disabled
    expect(cy.get('input.button').invoke('attr', 'disabled').should('exist'));

    cy.wait(2000);
  });

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
