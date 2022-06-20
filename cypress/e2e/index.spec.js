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

            // 左右箭頭
            cy.get('[data-button="right"]').click();
            cy.get('[data-button="left"]').click();
            cy.get($elem).should('have.attr', 'data-index', idx);

        });

    });

});
