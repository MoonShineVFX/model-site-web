Cypress.on('uncaught:exception', (err, runnable) => {

    // returning false here prevents Cypress from
    // failing the test
    return false;

});

// deftag
Cypress.Commands.add('deftag', (locale) => {

    locale = locale ? locale : Cypress.env('locale');

    cy.request({
        method: 'GET',
        url: `${Cypress.env('host')}/api/lang_configs`,
    })
    .its('body')
    .should('have.property', 'data')
    .then((resData) => {

        expect(resData).to.have.property(locale);
        expect(resData[locale]).to.be.an('object');
        return resData[locale];

    });

});

// login
Cypress.Commands.add('login', (
    account = 'abc@gmail.com',
    password = 'abc123456'
) => {

    let auth = btoa(`${account}:${password}`);

    cy.request({
        method: 'POST',
        url: '/api/login',
        form: true,
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });

});
