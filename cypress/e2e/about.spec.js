describe('/about', () => {

    beforeEach(() => cy.visit('/about'));

    it('visits the page', () => {

        cy.location('pathname').should('eq', '/about');
        cy.title().should('contain', '關於我們');

    });

    it('display thumb, data title and description in banner section', () => {

        cy.get('[data-section="banner"]').then(($elem) => {

            cy.get($elem)
                .find('.thumb img')
                .should('exist')
                .and('have.attr', 'src', $elem.find('.thumb img').attr('src'))
                .parents($elem)
                .find('.title')
                .should('contain', $elem.find('.description .title').text())
                .parent()
                .find('p')
                .should('contain', $elem.find('.description p').text());

        });

    });

    it('display data in support section', () => {

        cy.get('[data-section="support"] .MuiGrid-item')
            .should('have.length', 3)
            .each(($elem) => {

                cy.get($elem).should('contain', $elem.text());

            });

    });

});
