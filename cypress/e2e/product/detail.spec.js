const currPath = '/product/list?page=1';
const ms = 300;

describe('/product/{id}', () => {

    beforeEach(() => {

        cy.visit('/product/list?page=1');
        cy.get('figure .MuiGrid-item').as('list');

    });

    it('visits the page', () => {

        // 商品列表
        cy.get('@list').each(($list, idx) => {

            const $item = $list.find('.item');
            const title = $list.find('.item .item-content .title').text();

            cy.get(`[data-index="${idx}"]`)
                .find(`.item`)
                .invoke('removeAttr', 'target')
                .click();

            cy.title().should('contain', title);
            cy.location('pathname').should('eq', $item.attr('href'));

            cy.go('back');
            cy.wait(ms);

        });

    });

    it('display product information', () => {

        // 商品列表
        cy.get('@list').each(($list, idx) => {

            const $item = $list.find('.item');
            const title = $list.find('.item .item-content .title').text();

            cy.get(`[data-index="${idx}"]`)
                .find(`.item`)
                .invoke('removeAttr', 'target')
                .click();

            // banner
            cy.get('.detail-banner')
                .find('img')
                .then(($elem) => {

                    cy.get($elem).should('exist');
                    cy.get($elem).should('have.attr', 'src', $elem.attr('src'));

                });

            // info
            cy.get('[data-section="detail-data"]')
                .then(($elem) => {

                    // 左側
                    cy.get($elem).find('.title').should('contain', title);
                    cy.get($elem).find('.description').should('contain', $elem.find('.description').text());

                    // 軟體格式與算圖引擎
                    cy.get($elem).find('.format-and-renderer .label').should('contain', $elem.find('.format-and-renderer .label').text());
                    cy.get($elem).find('.format-and-renderer .item')
                        .its('length')
                        .should('gte', 1)

                    cy.get($elem)
                        .find('.format-and-renderer .item')
                        .each(($item) => {

                            cy.get($item).find('.title').should('contain', $item.find('.title').text());
                            cy.get($item).find('.renders').should('contain', $item.find('.renders').text());

                        });

                    cy.get($elem).find('.notice').should('contain', $elem.find('.notice').text());

                    // 右側
                    cy.get($elem).find('.price').should('contain', $elem.find('.price').text());
                    cy.get($elem).find('button')
                        .contains($elem.find('button').text())
                        .should('exist');

                    /**
                     * Betty notes: 加入購物車未寫
                     */

                    cy.get($elem)
                        .find('.other-info-item')
                        .should('have.length', 3)
                        .each(($item) => {

                            cy.get($item).find('.label').should('contain', $item.find('.label').text());
                            cy.get($item).find('p').should('contain', $item.find('p').text());

                        });

                });

            cy.go('back');
            cy.wait(ms);

        });

    });

    it('display product demo images and can preview', () => {

        // 商品列表
        cy.get('@list').each(($list, idx) => {

            cy.get(`[data-index="${idx}"]`)
                .find(`.item`)
                .invoke('removeAttr', 'target')
                .click();

            cy.get('[data-section="demo-image"]')
                .find('h2.title')
                .should('contain', '商品內容展示圖');

            cy.get('[data-section="demo-image"]')
                .find('.MuiGrid-item')
                .its('length')
                .should('gte', 1);

            cy.get('[data-section="demo-image"]')
                .find('.MuiGrid-item')
                .each(($elem, _idx) => {

                    cy.get($elem)
                        .find('img')
                        .then(($img) => {

                            cy.get($img).should('exist');
                            cy.get($img).should('have.attr', 'src', $img.attr('src'));

                        });

                    cy.get($elem).find(`[data-index="${_idx}"]`).click();

                    cy.get('[data-section="preview-image"]').should('have.length', 1);
                    // cy.get('[data-section="preview-image"] button').should('have.class', 'active');

                });

            cy.go('back');
            cy.wait(ms);

        });

    });

    // it('display relatived like product', () => {

    //     // 商品列表
    //     cy.get('@list').each(($list, idx) => {

    //         cy.get(`[data-index="${idx}"]`)
    //             .find(`.item`)
    //             .invoke('removeAttr', 'target')
    //             .click();

    //         cy.get('[data-section="demo-image"]')
    //             .find('h2.title')
    //             .should('contain', '你可能會喜歡的');

    //         cy.get('[data-section="demo-image"]')
    //             .find('.MuiGrid-item')
    //             .its('length')
    //             .should('gte', 1);

    //         cy.get('[data-section="demo-image"]')
    //             .find('.MuiGrid-item')
    //             .each(($elem) => {

    //                 cy.get($elem)
    //                     .find('img')
    //                     .then(($img) => {

    //                         cy.get($img).should('exist');
    //                         cy.get($img).should('have.attr', 'src', $img.attr('src'));

    //                     });

    //             });

    //         cy.go('back');
    //         cy.wait(ms);

    //     });

    // });

});
