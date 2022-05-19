let langs;

describe('header', () => {

    beforeEach(() => {

        cy.visit('/index');
        cy.get('header').as('header');
        cy.deftag().then((resData) => langs = resData);

    });

    context('Not login', () => {

        it('has host to use (from .env)', () => {

            expect(Cypress.env('host')).to.be.a('string');

        });

        it('display logo and click to home page', () => {

            cy.get('@header')
                .find('.logo-text')
                .then(($elem) => {

                    cy.get($elem)
                        .should('have.attr', 'href')
                        .and('include', '/');

                    cy.get($elem).click();
                    cy.url().should('include', '/');

                    cy.get($elem)
                        .should('have.attr', 'title')
                        .and('include', 'Moonshine Market');

                    cy.get($elem)
                        .children()
                        .should('exist');

                });

        });

        it('check text of menus', () => {

            const config = {
                '0': {
                    url: '/product/list?page=1',
                    text: langs.menu_store,
                },
                '1': {
                    url: '/about',
                    text: langs.menu_about,
                },
                '2': {
                    url: '/tutorial',
                    text: langs.menu_tutorial,
                },
            };

            cy.get('@header')
                .find('nav:first a')
                .should('have.length', 3)
                .each(($elem, idx) => {

                    cy.get($elem)
                        .should('have.attr', 'href')
                        .and('include', config[idx].url);

                    cy.get($elem)
                        .should('have.attr', 'title')
                        .and('include', config[idx].text);

                });

        });

        it('display cart icon and count', () => {

            cy.get('@header')
                .find('[data-icon="shopping-cart"]:first')
                .should('exist')
                .siblings('.count')
                .should('exist')
                .then(($elem) => {

                    const count = $elem.text();
                    expect(count).to.match(/\d/);

                });

        });

        it('display signin button and can direct to signin page', () => {

            cy.get('@header')
                .find('button')
                .should('contain', langs.text_signin)
                .click();

            cy.url().should('include', '/signin');

        });

    });

    // context('Login', () => {

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
