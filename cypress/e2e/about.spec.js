let langs;

describe('/about', () => {

    beforeEach(() => {

        cy.deftag().then((resData) => langs = resData);

    });

    it('visits the page', () => {

        cy.visit('/about');
        cy.location('pathname').should('eq', '/about');
        cy.title().should('contain', langs.about_title);

    });

    it('display thumb, data title and description in banner section', () => {

        cy.visit('/about');
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

        cy.visit('/about');
        cy.get('[data-section="support"] .MuiGrid-item')
            .should('have.length', 3)
            .each(($elem) => {

                cy.get($elem).should('contain', $elem.text());

            });

    });

});
