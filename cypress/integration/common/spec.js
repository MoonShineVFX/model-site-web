describe('ungroup check', () => {

    it('has host to use (from .env)', () => {

        cy.visit('/index');
        expect(Cypress.env('host')).to.be.a('string');

    });

});
