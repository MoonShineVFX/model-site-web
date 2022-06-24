import dayjs from 'dayjs';

describe('Footer', () => {

    beforeEach(() => cy.visit('/index'));

    it('display small logo and copyright', () => {

        cy.get('footer img')
            .should('have.attr', 'src')
            .and('include', '/logo_small.png');

        cy.get('footer .top span')
            .should('contain', `© ${dayjs().format('YYYY')} All rights reserved. Moonshine`);

        // privacy policy of google reCAPTCHA
        cy.get('footer .bottom')
            .should('contain', 'This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.');

    });

    it('display links of privacy policy and custom service mail address', () => {

        cy.get('footer .top a')
            .should('have.length', 2)
            .each(($elem, idx) => {

                cy.get($elem)
                    .should('have.attr', 'href', $elem.attr('href'))
                    .and('contain', $elem.text());

                // 先刪除另開分頁屬性
                if (idx !== 1) cy.get($elem).invoke('removeAttr', 'target').click();

            });

    });

    it('display language option and default is zh', () => {

        const config = {
            zh: '繁體中文',
            en: 'English',
            cn: '简体中文',
            jp: '日文',
        };

        cy.get('select[name="lang"] :selected')
            .should('contain', config[`${Cypress.env('locale')}`])
            .invoke('val')
            .should('eq', Cypress.env('locale'));

        cy.location('pathname').should('not.include', '/en');

    });

    it('change to other language with en', () => {

        cy.get('select[name="lang"]').select('en');
        cy.get('select[name="lang"] :selected').should('contain', 'English');
        cy.location('pathname').should('include', '/en');

    });

});
