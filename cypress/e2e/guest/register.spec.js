import dayjs from 'dayjs';

const fake = {
    account: `staff+test${dayjs().format('MMDDmmss')}@moonshine.tw`,
    password: 'abc123456',
};

const errorMesg = '此欄位為必填';
const ms = 500;

describe('/register', () => {

    context('Go to register page', () => {

        beforeEach(() => {

            cy.visit('/signin');
            cy.get('.btn-register button[type="button"]').click();
            cy.wait(ms);

        });

        it('display form and title', () => {

            cy.title().should('contain', '註冊');
            cy.get('.formWrap')
                .should('exist')
                .and('contain', '註冊');

            cy.get('.form-row-btns button[type="button"]')
                .should('have.length', 1);

            cy.location('pathname').should('eq', '/register');

        });

        it('visible submit button by checking I aggreee checkbox', () => {

            cy.get('.formWrap button[type="submit"]').should('be.disabled');
            cy.get('.formWrap .checkmark').click();
            cy.get('.formWrap form').submit();
            cy.get('.formWrap button[type="submit"]').should('not.be.disabled');
            cy.get('.formWrap .error-mesg').should('contain', errorMesg);

            cy.get('.formWrap [type="checkbox"]')
                .parent()
                .find('a')
                .then(($a) => {

                    cy.get($a).should('have.attr', 'href', '/privacy');
                    cy.get($a).invoke('removeAttr', 'target').click();

                });

        });

    });

    context('HTML form submission', () => {

        beforeEach(() => cy.visit('/register'));

        it('require account (email)', () => {

            cy.get('.formWrap .checkmark').click();
            cy.get('.formWrap form').submit();
            cy.get('.formWrap .error-mesg').should('contain', errorMesg);

        });

        it('require password', () => {

            cy.get('.formWrap [name="email"]').type(fake.account);
            cy.get('.formWrap .checkmark').click();
            cy.get('.formWrap form').submit();
            cy.get('.formWrap .error-mesg').should('contain', errorMesg);

        });

        it('require valid account and password', () => {

            cy.get('.formWrap [name="email"]').type('abc123456');
            cy.get('.formWrap [name="password"]').type('12345');

            cy.get('.formWrap .checkmark').click();
            cy.get('.formWrap button[type="submit"]').should(($btn) => {

                expect($btn).not.to.have.attr('disabled');

            }).click();

            cy.get('.formWrap .error-mesg').should('contain', '至少 8 碼');
            cy.get('.formWrap [name="password"]').clear().type(fake.password);
            cy.get('.formWrap .error-mesg').should('contain', errorMesg);
            cy.get('.formWrap [name="confirm_password"]').type('12345678');
            cy.get('.formWrap button[type="submit"]').click();
            cy.get('.formWrap .error-mesg').should('contain', '兩次輸入的密碼可能不同');
            cy.get('.formWrap [name="confirm_password"]').clear().type(fake.password);
            cy.get('.formWrap .error-mesg').should('not.exist');
            cy.get('.formWrap button[type="submit"]').click();

            // alert 錯誤
            cy.on('window:alert', (mesg) => {

                expect(mesg).to.deep.equal(['email: 请输入合法的邮件地址。']);

            });

        });

        it('successful register', () => {

            cy.get('.formWrap [name="email"]').type(fake.account);
            cy.get('.formWrap [name="password"]').type(fake.password);
            cy.get('.formWrap [name="confirm_password"]').type(fake.password);
            cy.get('.formWrap .checkmark').click();
            cy.get('.formWrap button[type="submit"]').click();

            // 驗證信提示
            cy.get('.MuiDialog-container').should('contain', '請至信箱收取驗證信並啟用帳號。');
            cy.get('.MuiDialog-container button').click();

        });

    });

});
