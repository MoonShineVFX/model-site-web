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
        url: `${Cypress.env('api_host')}/api/lang_configs`,
    })
    .its('body')
    .then((resData) => resData.data[locale]);

});

// login
Cypress.Commands.add('login', (
    account = 'staff+test06235545@moonshine.tw',
    password = 'abc123456'
) => {

    cy.visit('/signin');
    cy.intercept('**/api/login').as('signin');
    cy.get('.formWrap [name="email"]').type(account);
    cy.get('.formWrap [name="password"]').type(password);

    // "點我驗證" 按鈕
    cy.get('.formWrap [type="button"]')
        .contains('點我驗證')
        .click();

    cy.get('.formWrap button[type="submit"]').click();

    // localhost 環境才需要手動加 token
    cy.wait('@signin').then((xhr) => {

        cy.setCookie('token', xhr.response.body.data.token);
        cy.reload();

    });

});
