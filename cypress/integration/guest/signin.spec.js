let langs;

describe('/signin', () => {

    beforeEach(() => {

        cy.visit('/signin');
        cy.deftag().then((resData) => langs = resData);

    });

    context('Display UI', () => {

        it('display form layout', () => {

            cy.get('.formWrap')
                .should('exist')
                .contains(langs.text_signin_title);

            // cy.get('[type="button"]')
            //     .should('exist')
            //     .click();

            // cy.url().should('include', '/signin');

        });

    });

    context('HTML form submission', () => {

        it('require account(email)', () => {

            cy.get('form');
            // cy.get('form').submit();
            // cy.get('.error').should('contain', langs.error_required);

        });

        // it('require password', () => {

        //     cy.get('[name="account"]').type(account);
        //     cy.get('form').submit();
        //     cy.get('.error').should('contain', langs.error_required);

        // });

        // it('require valid account and password', () => {

        //     cy.get('[name="account"]').type(account);
        //     cy.get('[name="password"]').type('12345');
        //     cy.get('form').submit();
        //     cy.get('.ant-modal-confirm-error').should('contain', 'password wrong');

        // });

        // it('successful signin', () => {

        //     cy.get('[name="account"]').type(account);
        //     cy.get('[name="password"]').type(account);
        //     cy.get('form').submit();
        //     cy.url().should('include', '/index');
        //     cy.getCookie('pmb-session').should('exist');

        // });

    });

    // context('HTML form submission with cy.request', () => {

    //     let auth = btoa(`${account}:${account}`);

    //     it('google reCAPTCHA by api', () => {

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

    //     it('signin by api', () => {

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
