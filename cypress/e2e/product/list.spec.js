const currPath = '/product/list?page=1';

describe(`${currPath}`, () => {

    beforeEach(() => cy.visit(currPath));

    it('visits the page', () => {

        cy.location().should((locate) => {

            expect(locate.pathname).to.eq('/product/list');
            expect(locate.search).to.eq('?page=1');

        });

        cy.title().should('contain', '商店');

    });

    it('display page title and data length at least one', () => {

        cy.get('figure .MuiGrid-item')
            .its('length')
            .then((length) => {

                expect(length).to.gte(1);

                // pagination
                if (length > 10) {

                    cy.get('.paginations').should('exist');

                }

            });

        // data thumb and title
        cy.get('figure .MuiGrid-item')
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
