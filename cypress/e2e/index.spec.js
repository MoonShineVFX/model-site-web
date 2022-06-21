describe('/index', () => {

    beforeEach(() => cy.visit('/'));

    it('visits the page', () => {

        cy.location('pathname').should('eq', '/');
        cy.title().should('contain', '首頁');

    });

    it('display banner section and data length at least one', () => {

        cy.get('.banner-wrap .item')
            .its('length')
            .should('gte', 1);

        cy.get('.banner-wrap .item').each(($elem, idx) => {

            // 當前 banner 才能點擊
            if ($elem.hasClass('active')) {

                cy.get($elem).children().should('have.class', 'inner');

                cy.get($elem)
                    .find('a')
                    .invoke('removeAttr', 'target')
                    .click()
                    .should('have.attr', 'href', $elem.find('a').attr('href'))
                    .find('img')
                    .should('exist')
                    .and('have.attr', 'src', $elem.find('img').attr('src'));

                cy.get($elem)
                    .find('.slideshow-info-wrap .flag')
                    .should('contain', 'New')
                    .next()
                    .should('contain', $elem.find('.slideshow-info-wrap .title').text())
                    .next()
                    .should('contain', $elem.find('.slideshow-info-wrap .description').text());

            }

            cy.get('[data-button="right"]').click();
            cy.get('[data-button="left"]').click();
            cy.get($elem).should('have.attr', 'data-index', idx);

        });

    });

    it('display latest product list and data length at least four', () => {

        cy.get('[data-section="product"] .title')
            .should('contain', '最新上架')
            .parent()
            .find('.model-button')
            .contains('顯示更多')
            .click();

        // 最新上架列表
        cy.get('[data-section="product"] .MuiGrid-item')
            .its('length')
            .should('gte', 4);

        cy.get('[data-section="product"] .MuiGrid-item').each(($elem) => {

            cy.get($elem).children().should('have.class', 'item');

            cy.get($elem)
                .find('.item')
                .invoke('removeAttr', 'target')
                .click()
                .should('have.attr', 'href', $elem.find('.item').attr('href'))
                .find('img')
                .should('exist')
                .and('have.attr', 'src', $elem.find('img').attr('src'));

            cy.get($elem)
                .find('.item-content .title')
                .should('contain', $elem.find('.title').text())
                .next()
                .should('contain', $elem.find('.price').text());

        });

    });

    it('display tutorial list and data length at least one', () => {

        cy.get('[data-section="tutorial"] .title')
            .should('contain', '文章')
            .parent()
            .find('.model-button')
            .contains('顯示更多')
            .click();

        // 文章列表
        cy.get('[data-section="tutorial"] .itemWrap')
            .its('length')
            .should('gte', 1);

        cy.get('[data-section="tutorial"] .itemWrap').each(($elem) => {

            cy.get($elem).should('have.class', 'itemWrap');

            cy.get($elem)
                .should('have.attr', 'href', $elem.attr('href'))
                .find('img')
                .should('exist')
                .and('have.attr', 'src', $elem.find('img').attr('src'));

            cy.get($elem)
                .find('.item-content .title')
                .should('contain', $elem.find('.title').text())
                .next()
                .should('contain', $elem.find('p').text());

        });

    });

});
