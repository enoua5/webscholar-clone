describe('login logout correctly', () => {
  beforeEach(() => {
    // create mock account
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
  })
  it('should submit form correctly and be logged in', () => {
    cy.visit('http://localhost:4200/');
    // page should display
    expect(cy.get('h1').should('have.text', 'Log In'));

    // fill out values
    cy.get('#username').type('fake.guy@fakeemailserviceprovider.internet');
    cy.get('#password').type('ASDFasdfasdf1!');

    cy.get('form').submit();
  })
})
