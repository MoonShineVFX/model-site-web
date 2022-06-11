let langs;

describe('Header', () => {

    beforeEach(() => {

        cy.visit('/index');
        cy.deftag().then((resData) => langs = resData);

    });

    context('Not signin header', () => {

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

    context('Signin header', () => {

        beforeEach(() => cy.login());

        it('display my account button', () => {

            cy.get('header [type="button"]')
                .should('contain', langs.member_my_account)
                .click();

            cy.get('header [type="button"]')
                .next()
                .should('exist')
                .find('.menu-item')
                .each(($elem) => {

                    cy.get($elem).should('have.attr', 'href', $elem.attr('href'));
                    cy.get($elem).should('contain', $elem.text());

                });

        });

        it('can direct to my account page by clicking account center button', () => {

            cy.get('header [type="button"]')
                .should('contain', langs.member_my_account)
                .click();

            cy.get('header [type="button"]')
                .next()
                .find('.menu-item')
                .contains(langs.member_account_center)
                .click();

            cy.location('pathname').should('eq', '/member/account');

        });

        it('can logout by clicking logout button', () => {

            cy.get('header [type="button"]')
                .should('contain', langs.member_my_account)
                .click();

            cy.get('header [type="button"]')
                .next()
                .find('.menu-item')
                .contains(langs.text_logout)
                .click();

            // localhost 環境才需要手動清除
            cy.location().then((locate) => {

                if (locate.host === 'localhost:1006') {

                    cy.clearCookie('token');

                }

            });

            cy.getCookie('token').should('not.exist');

        });

    });

});
