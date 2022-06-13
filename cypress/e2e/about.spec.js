describe('/about', () => {

    beforeEach(() => cy.visit('/about'));

    it('visits the page', () => {

        cy.location('pathname').should('eq', '/about');
        cy.title().should('contain', '關於我們');

    });

    it('display thumb, data title and description in banner section', () => {

        cy.get('[data-section="banner"]').then(($elem) => {

            const $thumb = $elem.find('.thumb img');
            const $desc = $elem.find('.description');

            cy.get($elem)
                .find('.thumb img')
                .should('exist')
                .and('have.attr', 'src', $thumb.attr('src'));

            cy.get($desc)
                .find('.title')
                .should('contain', $desc.find('.title').text());

            cy.get($desc)
                .find('p')
                .should('contain', $desc.find('p').text());

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
