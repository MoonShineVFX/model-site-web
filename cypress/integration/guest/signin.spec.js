const account = 'admin';
const errorMesg = '此欄位為必填!';

describe('/signin', () => {

    // context('Unauthorized', () => {

    //     it('display guest view when not signin', () => {

    //         cy.visit('/signin');
    //         cy.get('section').should('contain', '尚未登入...');
    //         cy.get('[type="button"]')
    //             .should('exist')
    //             .click();

    //         cy.url().should('include', '/signin');

    //     });

    // });

    context('HTML form submission', () => {

        beforeEach(() => {

            cy.visit('/signin');

        });

        it('require account(email)', () => {

            cy.get('form').submit();
            cy.get('.error').should('contain', errorMesg);

        });

        it('require password', () => {

            cy.get('[name="account"]').type(account);
            cy.get('form').submit();
            cy.get('.error').should('contain', errorMesg);

        });

        it('require valid account and password', () => {

            cy.get('[name="account"]').type(account);
            cy.get('[name="password"]').type('12345');
            cy.get('form').submit();
            cy.get('.ant-modal-confirm-error').should('contain', 'password wrong');

        });

        it('successful signin', () => {

            cy.get('[name="account"]').type(account);
            cy.get('[name="password"]').type(account);
            cy.get('form').submit();
            cy.url().should('include', '/index');
            cy.getCookie('pmb-session').should('exist');

        });

    });

    // context('HTML form submission with cy.request', () => {

    //     let auth = btoa(`${account}:${account}`);

    //     it('test by api', () => {

    //         cy.request({
    //             method: 'POST',
    //             url: '/api/signin',
    //             form: true,
    //             headers: {
    //                 Authorization: `Basic ${auth}`,
    //             },
    //         });

    //         cy.getCookie('pmb-session').should('exist');

    //     });

    // });

    // context('Reusable "signin" custom command', () => {

    //     Cypress.Commands.add('mkwsignin', (account = 'admin', password = 'admin') => {

    //         let auth = btoa(`${account}:${password}`);

    //         return cy.request({
    //             method: 'POST',
    //             url: '/api/signin',
    //             form: true,
    //             headers: {
    //                 Authorization: `Basic ${auth}`,
    //             },
    //         });

    //     });

    //     beforeEach(() => cy.mkwsignin());

    //     it('can visit /index', () => {

    //         cy.visit('/index');
    //         cy.get('main').should('have.class', 'main');

    //     });

    //     it('can simply request other authenticated pages', () => {

    //         cy.request({
    //             method: 'POST',
    //             url: '/api/web_departments_roles_skills',
    //         })
    //         .its('body')
    //         .should('have.property', 'data')
    //         .then((resData) => {

    //             expect(resData).to.have.property('departments');
    //             expect(resData.departments).to.be.an('array');

    //         });

    //     });

    // });

});
