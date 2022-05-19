import dayjs from 'dayjs';

let langs;

describe('footer', () => {

    beforeEach(() => {

        cy.visit('/index');
        cy.get('footer').as('footer');
        cy.deftag().then((resData) => langs = resData);

    });

    it('display logo and copyright', () => {

        cy.get('@footer')
            .then(($elem) => {

                cy.get($elem)
                    .find('img')
                    .should('have.attr', 'src')
                    .and('include', '/logo_small.png');

                cy.get($elem)
                    .find('.top span')
                    .should('contain', `© ${dayjs().format('YYYY')} All rights reserved. Moonshine`);

                // privacy policy of google reCAPTCHA
                cy.get($elem)
                    .find('.bottom')
                    .should('contain', 'This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.');

            });

    });

    it('display links of privacy policy and custom service mail address', () => {

        const config = {
            '0': {
                url: '/privacy',
                text: langs.text_privacy,
            },
            '1': {
                url: 'mailto:service@moonshine.tw',
                text: langs.text_custom_service,
            },
        };

        cy.get('@footer')
            .find('.top a')
            .should('have.length', 2)
            .each(($elem, idx) => {

                cy.get($elem)
                    .should('have.attr', 'href')
                    .and('include', config[idx].url);

                cy.get($elem)
                    .should('have.attr', 'title')
                    .and('include', config[idx].text);

            });

    });

    it('display language option and default is zh', () => {

        cy.get('select[name="lang"] :selected')
            .should('have.text', langs[`lang_${Cypress.env('locale')}`])
            .invoke('val')
            .should('eq', Cypress.env('locale'));

        cy.url().should('not.include', '/en');

    });

    it('change to other language with en', () => {

        cy.get('select[name="lang"]').select('en');
        cy.get('select[name="lang"] :selected')
            .should('have.text', langs.lang_en);

        cy.url().should('include', '/en');

    });

});
