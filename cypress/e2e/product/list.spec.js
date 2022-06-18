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

                cy.get($elem).children().should('have.class', 'item');

                cy.get($elem)
                    .find('.item')
                    .should('have.attr', 'href', $elem.find('.item').attr('href'))
                    .find('img')
                    .should('exist')
                    .and('have.attr', 'src', $elem.find('.item-thumb img').attr('src'));

                cy.get($elem)
                    .find('.item-content .title')
                    .should('contain', $elem.find('.item-content .title').text())
                    .parent()
                    .find('.price')
                    .should('contain', $elem.find('.item-content .price').text());

            });

    });

});
