const currPath = '/product/1';
let $title;

describe('/product/{id}', () => {

    beforeEach(() => {

        // cy.visit(currPath);
        // cy.wait(300);
        // cy.get('[data-section="detail-data"] h1.title')
        //     .then(($elem) => $title = $elem.text());
        cy.visit('/product/list?page=1');
        cy.wait(300);
        cy.get('figure .MuiGrid-item').as('list');

    });

    it('visits the page', () => {

        cy.get('@list').each(($elem) => {

            const $item = $elem.find('.item');

            cy.get($item).invoke('removeAttr', 'target').click();
            cy.location().should((locate) => {

                expect(locate.pathname).to.be.eq($item.attr('href'));

                if (locate.pathname === $item.attr('href')) cy.go('back');

            });

        });

        // cy.title().should('contain', $title);

    });

    // it('display product detail data', () => {

    //     // banner
    //     cy.get('.detail-banner')
    //         .find('img')
    //         .then(($elem) => {

    //             cy.get($elem).should('exist');
    //             cy.get($elem).should('have.attr', 'src', $elem.attr('src'));

    //         });

    //     // data
    //     cy.get('[data-section="detail-data"]')
    //         .then(($elem) => {

    //             // 左側
    //             cy.get($elem).find('.title').should('contain', $title);
    //             cy.get($elem).find('.description').should('contain', $elem.find('.description').text());

    //             // 軟體格式與算圖引擎
    //             cy.get($elem).find('.format-and-renderer .label').should('contain', $elem.find('.format-and-renderer .label').text());
    //             cy.get($elem).find('.format-and-renderer .item')
    //                 .its('length')
    //                 .should('gte', 1)

    //             cy.get($elem).find('.format-and-renderer .item').each(($item) => {

    //                 cy.get($item).find('.title').should('contain', $item.find('.title').text());
    //                 cy.get($item).find('.renders').should('contain', $item.find('.renders').text());

    //             });

    //             cy.get($elem).find('.notice').should('contain', $elem.find('.notice').text());

    //             // 右側
    //             cy.get($elem).find('.price').should('contain', $elem.find('.price').text());
    //             cy.get($elem).find('button')
    //                 .contains($elem.find('button').text())
    //                 .should('exist');

    //             cy.get($elem).find('.other-info-item')
    //                 .should('have.length', 3)
    //                 .each(($item) => {

    //                     cy.get($item).find('.label').should('contain', $item.find('.label').text());
    //                     cy.get($item).find('p').should('contain', $item.find('p').text());

    //                 });

    //         });

    // });

});
