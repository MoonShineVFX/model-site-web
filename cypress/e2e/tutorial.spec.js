describe('/tutorial', () => {

    beforeEach(() => cy.visit('/tutorial'));

    it('visits the page', () => {

        cy.location('pathname').should('eq', '/tutorial');
        cy.title().should('contain', '文章');

    });

    it('display page title and data length at least one', () => {

        cy.get('main .Model-container h1').should('contain', '文章');
        cy.get('main .Model-container .MuiGrid-item')
            .its('length')
            .should('gte', 1);

        // data thumb and title
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
