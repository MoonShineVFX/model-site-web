let langs;

describe('Header', () => {

    beforeEach(() => {

        cy.visit('/index');
        cy.deftag().then((resData) => langs = resData);

    });

    context('Not signin', () => {

        it('display logo, menus, cart and signin button', () => {

            let obj = {};

            // Logo
            cy.get('header .logo-text')
                .should('have.attr', 'href')
                .and('include', '/');

            cy.get('header .logo-text').click();
            cy.location('origin').should('eq', location.origin);

            // Menus
            cy.get('header nav:first a')
                .should('have.length', 3)
                .each(($elem, idx) => {

                    obj[idx] = obj[idx] || {};
                    obj[idx] = {
                        url: $elem.attr('href'),
                        text: $elem.text(),
                    };

                    cy.get($elem)
                        .should('have.attr', 'href')
                        .and('include', obj[idx].url);

                    cy.get($elem).should('have.text', obj[idx].text);
                    cy.get($elem).click();
                    cy.url({timeout: 10000}).should('include', obj[idx].url);

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
                .should('have.text', langs.text_signin)
                .click();

            cy.url({timeout: 10000}).should('include', '/signin');

        });

        it('can direct to signin page by clicking cart', () => {

            cy.get('header [data-device="desktop"]').click();
            cy.get('header .items a').should('have.length', 0);
            cy.getCookie('token').should('not.exist');

            cy.get('header .goToOrder a')
                .contains(langs.cart_go_to_checkout)
                .should('have.attr', 'href')
                .and('include', '/signin');

            cy.get('header .goToOrder a').click();
            cy.url({timeout: 10000}).should('include', '/signin');

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
    //         cy.url().should('include', '/index');
    //         cy.getCookie('pmb-session').should('exist');

    //     });

    // });

});
