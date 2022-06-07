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
    account = 'abc@gmail.com',
    password = 'abc123456'
) => {

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUzNzUzMTg2LCJpYXQiOjE2NTM3NDk1ODYsImp0aSI6IjllOWEwZDMyZDQ3YjRmMDViYzA0MDVjMWNkYTQzZWM0IiwidXNlcl9pZCI6Miwic2NvcGUiOiJjdXN0b21lciJ9.-xlMsRJO9UcfGuMsrEr2jM7tzxkHvi3mIdJk0bFAidE';

    cy.get('.formWrap [name="email"]').type(account);
    cy.get('.formWrap [name="password"]').type(password);

    // "點我驗證" 按鈕
    cy.get('.formWrap [type="button"]')
        .contains(langs.btn_verify)
        .click();

    cy.get('.formWrap button[type="submit"]').click();

    cy.location()
        .then((loc) => {

            if (loc.origin === 'http://localhost:1006') cy.setCookie('token', token);

        });

    cy.getCookie('token').should('exist');
    cy.location('origin').should('eq', location.origin);

});
