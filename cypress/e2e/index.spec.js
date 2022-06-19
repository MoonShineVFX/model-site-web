describe('/index', () => {

    beforeEach(() => cy.visit('/'));

    it('visits the page', () => {

        cy.location('pathname').should('eq', '/');
        cy.title().should('contain', '首頁');

    });

    it('display banner section and data length at least one', () => {

        cy.get('.banner-wrap .item')
            .should('have.class', 'hide')
            .its('length')
            .should('gte', 1);

        // cy.get('main .Model-container .MuiGrid-item')
        //     .its('length')
        //     .should('gte', 1);

    });

    // it('display data thumb and title', () => {

    //     cy.get('main .Model-container .MuiGrid-item')
    //         .each(($elem) => {

    //             const $item = $elem.find('.item');

    //             cy.get($elem).children().should('have.class', 'item');
    //             cy.get($item).should('have.attr', 'href', $item.attr('href'));
    //             cy.get($item).should('contain', $item.text());
    //             cy.get($item)
    //                 .find('img')
    //                 .should('exist')
    //                 .and('have.attr', 'src', $item.find('img').attr('src'));

    //         });

    // });

});
