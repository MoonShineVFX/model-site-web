let langs;

describe('/tutorial', () => {

    beforeEach(() => {

        cy.deftag().then((resData) => langs = resData);

    });

    it('visits the page', () => {

        cy.visit('/tutorial');
        cy.location('pathname').should('eq', '/tutorial');
        cy.title().should('contain', langs.menu_tutorial);

    });

    it('display page title and data length at least one', () => {

        cy.visit('/tutorial');
        cy.get('main .Model-container h1').should('contain', langs.menu_tutorial);
        cy.get('main .Model-container .MuiGrid-item')
            .its('length')
            .should('gte', 1);

    });

    it('display data thumb and title', () => {

        cy.visit('/tutorial');
        cy.get('main .Model-container .MuiGrid-item')
            .each(($elem) => {

                const $item = $elem.find('.item');

                cy.get($elem).children().should('have.class', 'item');
                cy.get($item).should('have.attr', 'href', $item.attr('href'));
                cy.get($item).should('contain', $item.text());
                cy.get($item)
                    .find('img')
                    .should('exist')
                    .and('have.attr', 'src', $item.find('img').attr('src'));

            });

    });

});
