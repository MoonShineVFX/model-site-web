let langs;

describe('Header', () => {

    beforeEach(() => {

        cy.visit('/index');
        cy.deftag().then((resData) => langs = resData);

    });

    context('Not signin', () => {

        it('display logo, menus, cart and signin button', () => {

            // Logo
            cy.get('header .logo-text').should('have.attr', 'href', '/');
            cy.get('header .logo-text').click();
            cy.location('origin').should('eq', location.origin);

            // Menus
            cy.get('header nav:first a')
                .should('have.length', 3)
                .each(($elem) => {

                    cy.get($elem)
                        .should('have.attr', 'href', $elem.attr('href'))
                        .and('contain', $elem.text());

                    cy.get($elem).click();
                    cy.url().should('include', $elem.attr('href'));

                });

            // Cart
            cy.get('header [data-icon="shopping-cart"]:first')
                .should('exist')
                .siblings('.count')
                .should('exist')
                .then(($elem) => {

                    const count = $elem.text();
                    expect(count).to.match(/\d/);

                });

            // Button
            cy.get('header [type="button"]')
                .should('contain', langs.text_signin)
                .click();

            cy.location('pathname').should('eq', '/signin');

        });

        it('can direct to signin page by clicking cart', () => {

            cy.get('header [data-device="desktop"]')
                .should('have.attr', 'href', '/signin')
                .click();

            cy.getCookie('token').should('not.exist');
            cy.location('pathname').should('eq', '/signin');

        });

    });

    // context('Signin', () => {

    //     beforeEach(() => {

    //         cy.visit('/signin');

    //     });

    //     it('require account(email)', () => {

    //         cy.get('form').submit();
    //         cy.get('.error').should('contain', errorMesg);

    //     });

    //     it('require password', () => {

    //         cy.get('[name="account"]').type(account);
    //         cy.get('form').submit();
    //         cy.get('.error').should('contain', errorMesg);

    //     });

    //     it('require valid account and password', () => {

    //         cy.get('[name="account"]').type(account);
    //         cy.get('[name="password"]').type('12345');
    //         cy.get('form').submit();
    //         cy.get('.ant-modal-confirm-error').should('contain', 'password wrong');

    //     });

    //     it('successful signin', () => {

    //         cy.get('[name="account"]').type(account);
    //         cy.get('[name="password"]').type(account);
    //         cy.get('form').submit();
    //         cy.location('pathname).should('eq', '/index');
    //         cy.getCookie('pmb-session').should('exist');

    //     });

    // });

});
