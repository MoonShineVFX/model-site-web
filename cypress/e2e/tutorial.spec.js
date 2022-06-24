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

                cy.get($elem).children().should('have.class', 'item');

                cy.get($elem)
                    .find('.item')
                    .should('have.attr', 'href', $elem.find('.item').attr('href'))
                    .find('img')
                    .should('exist')
                    .and('have.attr', 'src', $elem.find('.item-thumb img').attr('src'));

                cy.get($elem)
                    .find('.item-content .title')
                    .should('contain', $elem.find('.item-content .title').text());

            });

    });

});
