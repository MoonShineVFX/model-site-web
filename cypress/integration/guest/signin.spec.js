let langs;

describe('/signin', () => {

    beforeEach(() => {

        cy.visit('/signin');
        cy.deftag().then((resData) => langs = resData);

    });

    context('HTML form submission', () => {

        let obj = {};

        it('display form, title and buttons', () => {

            cy.get('.formWrap')
                .should('exist')
                .and('contain', langs.text_signin_title);

            cy.get('.form-row-btns button')
                .should('have.length', 4)
                .each(($btn, idx) => {

                    obj[idx] = $btn.text();
                    cy.get($btn).should('have.text', obj[idx]);

                });

            // cy.get('.form-row-btns button[type="submit"]')
            //     .should('have.attr', 'disabled');

        });

        // it('require account(email)', () => {

        //     cy.get('form');
        //     // cy.get('form').submit();
        //     // cy.get('.error').should('contain', langs.error_required);

        // });

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
