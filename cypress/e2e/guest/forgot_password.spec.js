const fake = {
    account: 'staff+test06235545@moonshine.tw',
};

const errorMesg = '此欄位為必填';
const ms = 500;

describe('/forgot_password', () => {

    beforeEach(() => {

        cy.visit('/signin');
        cy.get('a[data-link="forgot-password"]').click();
        cy.wait(ms);

    });

    it('display form, title', () => {

        cy.title().should('contain', '忘記密碼');
        cy.get('.formWrap')
            .should('exist')
            .and('contain', '忘記密碼');

        cy.get('.form-row-btns button[type="button"]')
            .should('have.length', 1);

        cy.location('pathname').should('eq', '/forgot_password');

    });

    it('require account (email)', () => {

        cy.get('.formWrap form').submit();
        cy.get('.formWrap .error-mesg').should('contain', errorMesg);

    });

    it('send email successful', () => {

        cy.get('.formWrap [name="email"]').type(fake.account);
        cy.get('.formWrap button[type="submit"]').click();
        cy.get('.formWrap ').should('contain', '已成功發送至你輸入的電子信箱');

    });

});
