import dayjs from 'dayjs';

let langs;

describe('Footer', () => {

    beforeEach(() => {

        cy.visit('/index');
        cy.deftag().then((resData) => langs = resData);

    });

    it('display small logo and copyright', () => {

        cy.get('footer img')
            .should('have.attr', 'src')
            .and('include', '/logo_small.png');

        cy.get('footer .top span')
            .should('have.text', `© ${dayjs().format('YYYY')} All rights reserved. Moonshine`);

        // privacy policy of google reCAPTCHA
        cy.get('footer .bottom')
            .should('have.text', 'This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.');

    });

    it('display links of privacy policy and custom service mail address', () => {

        let obj = {};

        cy.get('footer .top a')
            .should('have.length', 2)
            .each(($elem, idx) => {

                obj[idx] = obj[idx] || {};
                obj[idx] = {
                    url: $elem.attr('href'),
                    text: $elem.text(),
                };

                cy.get($elem)
                    .should('have.attr', 'href')
                    .and('include', obj[idx].url);

                cy.get($elem).should('have.text', obj[idx].text);
                if (idx !== 1) cy.get($elem).click();

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
